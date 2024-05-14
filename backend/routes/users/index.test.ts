import request from 'supertest';
import server from '../../server';

describe('users index', () => {
    it('should return a list of users', () => {
        return request(server)
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(Array.isArray(response.body.data)).toBeTruthy();
            });
    });
});
