import request from 'supertest';
import server from './server';

describe('main index', () => {
    it('should be running', () => {
        return request(server)
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /json/);
    });
});
