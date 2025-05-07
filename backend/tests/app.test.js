/* eslint-env jest */
// Mocks doivent être définis avant les imports
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../services/dbService', () => ({
    connectDB: jest.fn(),
    pool: {
        connect: jest.fn()
    }
}));

const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

describe('Basic route test', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 404 for unknown route', async () => {
        const res = await request(app).get('/nonexistentroute');
        expect(res.statusCode).toBe(404);
    });

    describe('Auth routes', () => {
        describe('POST /auth/login', () => {
            it('should return 200 and a token when credentials are valid', async () => {
                // Mock database client
                const mockClient = {
                    query: jest.fn().mockResolvedValue({
                        rows: [{ id: 1, username: 'testuser', password: 'hashedpassword' }]
                    }),
                    release: jest.fn()
                };

                require('../services/dbService').pool.connect.mockResolvedValue(mockClient);

                // Correct way to mock async functions
                bcrypt.compare = jest.fn().mockResolvedValue(true);
                jwt.sign = jest.fn().mockReturnValue('valid-token');

                const res = await request(app)
                    .post('/auth/login')
                    .send({ identifier: 'leJ', password: 'LuxGaren33!' });

                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('token');
                expect(res.body.token).toBe('valid-token');
                expect(mockClient.query).toHaveBeenCalledWith(
                    'SELECT * FROM users WHERE username = $1 OR email = $1',
                    ['leJ']
                );
            });

            it('should return 401 when user does not exist', async () => {
                const mockClient = {
                    query: jest.fn().mockResolvedValue({ rows: [] }),
                    release: jest.fn()
                };

                require('../services/dbService').pool.connect.mockResolvedValue(mockClient);

                const res = await request(app)
                    .post('/auth/login')
                    .send({ identifier: 'nonexistentuser', password: 'password123' });

                expect(res.statusCode).toBe(401);
                expect(res.body).toHaveProperty('error');
            });

            // Corrigé le test imbriqué
            it('should return 401 when password is incorrect', async () => {
                const mockClient = {
                    query: jest.fn().mockResolvedValue({
                        rows: [{ id: 1, username: 'testuser', password: 'hashedpassword' }]
                    }),
                    release: jest.fn()
                };

                require('../services/dbService').pool.connect.mockResolvedValue(mockClient);

                // Correct way to mock async functions
                bcrypt.compare = jest.fn().mockResolvedValue(false);

                const res = await request(app)
                    .post('/auth/login')
                    .send({ identifier: 'testuser', password: 'wrongpassword' });

                expect(res.statusCode).toBe(401);
                expect(res.body).toHaveProperty('error');
            });
        });
    });
});
