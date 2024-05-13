import { Router } from "express";
import db from '../../prisma/db';

const router = Router();

router.get("/users", async (req, res) => {
    const search = (req.query.q?.toString() || '').toUpperCase();

    const data = await db.user.findMany({
        where: {
            searchIndexed: {
                contains: search,
            },
        },
        orderBy: {
            name: 'asc',
        },
    });

    res.json({
        data: data,
    });
});

export default router;
