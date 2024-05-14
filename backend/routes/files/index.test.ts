import request from 'supertest';
import server from '../../server';

describe('files index', () => {
    it('should give error if no file is uploaded', () => {
        request(server)
            .post('/api/files')
            .expect(500)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.message).toBe('No file uploaded');
            });
    });

    it('should give error because file is invalid', () => {
        const buffer = Buffer.from('test');

        request(server)
            .post('/api/files')
            .attach('file', buffer, 'test.txt')
            .expect(500)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.message).toBe('Invalid file type');
            });
    });

    it('should upload a file', () => {
        const content = `name,city,country,favorite_sport
        John Doe,New York,USA,Basketball
        Jane Smith,London,UK,Football
        Mike Johnson,Paris,France,Tennis
        Karen Lee,Tokyo,Japan,Swimming
        Tom Brown,Sydney,Australia,Running
        Emma Wilson,Berlin,Germany,Basketball
        `;
        const buffer = Buffer.from(content);

        request(server)
            .post('/api/files')
            .attach('file', buffer, 'test.csv')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.message).toBe('The file was uploaded successfully.');
            });
    });

    it('should give an error because the file is empty', () => {
        const content = `name,city,country,favorite_sport
        `;
        const buffer = Buffer.from(content);

        request(server)
            .post('/api/files')
            .attach('file', buffer, 'test.csv')
            .expect(500)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.message).toBe('Empty file');
            });
    });

    it('should give an error because the file is missing a header', () => {
        const content = `name,city,favorite_sport
        John Doe,New York,USA,Basketball
        `;
        const buffer = Buffer.from(content);

        request(server)
            .post('/api/files')
            .attach('file', buffer, 'test.csv')
            .expect(500)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.message).toBe('Missing header: country');
            });
    });

    it('should give an error because one of the lines is empty', () => {
        const content = `name,city,country,favorite_sport
        John Doe,New York,USA,Basketball
        Jane Smith,London,UK,Football
        Mike Johnson,Paris,France,Tennis
        ,,,
        Tom Brown,Sydney,Australia,Running
        Emma Wilson,Berlin,Germany,Basketball
        `;
        const buffer = Buffer.from(content);

        request(server)
            .post('/api/files')
            .attach('file', buffer, 'test.csv')
            .expect(500)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.message).toBe('Missing data at line 4');
            });
    });
});
