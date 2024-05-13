import { Router } from "express";
import multer from 'multer';
import db from '../../prisma/db';
import fs from 'fs/promises';

const router = Router();

const upload = multer({
    dest: 'uploads/',
});
type headersNames = 'name' | 'city' | 'country' | 'favorite_sport';

router.post("/files", upload.single('file'), async (req, res) => {
    const file = req.file;

    try {
        if( !file ) {
            return res.status(500).json({
                message: 'No file uploaded',
            });
        }
        // We only persist if all data is valid
        let transactions: any[] = [];

        // Validate the file
        const extension = file.originalname.split('.').pop();

        if( extension !== 'csv' ) {
            return res.status(500).json({
                message: 'Invalid file type',
            });
        }
        const fileContent = await fs.readFile(file.path, 'utf-8');
        const lines = fileContent.trim().split('\n');

        if( !lines || lines.length < 2 ) {
            // The first line is the header
            return res.status(500).json({
                message: 'Empty file',
            });
        }
        const requiredHeaders = ['name','city','country','favorite_sport'];
        let fieldIndexes = {
            name: -1,
            city: -1,
            country: -1,
            favorite_sport: -1,
        };

        for(let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const fields = line.split(',');

            if( i === 0 ) {
                for( const header of requiredHeaders ) {
                    const index = fields.indexOf(header);
                    if( index === -1 ) {
                        return res.status(500).json({
                            message: `Missing header: ${header}`,
                        });
                    }
                    fieldIndexes[header as headersNames] = index;
                }
                continue;
            }

            // for conciseness
            const user = {
                name: fields[fieldIndexes.name]?.trim() || '',
                city: fields[fieldIndexes.city]?.trim() || '',
                country: fields[fieldIndexes.country]?.trim() || '',
                favoriteSport: fields[fieldIndexes.favorite_sport]?.trim() || '',
            }

            if( !user.name || !user.city || !user.country || !user.favoriteSport ) {
                return res.status(500).json({
                    message: `Missing data at line ${i}`,
                });
            }

            const searchIndex = user.name.toUpperCase() + ' ' +
                user.city.toUpperCase() + ' ' +
                user.country.toUpperCase() + ' ' +
                user.favoriteSport.toUpperCase();

            transactions.push(db.user.create({
                data: {
                    name: user.name,
                    city: user.city,
                    country: user.country,
                    favoriteSport: user.favoriteSport,
                    searchIndexed: searchIndex,
                },
            }));
        }

        if( transactions.length > 0 ) {
            await db.$transaction(transactions);
        }

        res.json({
            message: 'The file was uploaded successfully.',
        });

    } catch(err: any) {
        return res.status(500).json({
            message: err.message,
        });

    } finally {
        // Remove the temporary file from the server
        if( file ) {
            try {
                await fs.unlink(file.path);

            } catch(er: any) {
                console.error('Could not remove temp file', er);
            }
        }
    }
});

export default router;
