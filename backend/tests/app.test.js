const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { vi, beforeEach } = require('vitest');

describe('Basic route test', () => {
    it('should return 404 for unknown route', async () => {
        const res = await request(app).get('/nonexistentroute');
        expect(res.statusCode).toBe(404);
    });

    // Mock dependencies
    vi.mock('../services/dbService', () => ({
        connectDB: vi.fn(),
        pool: {
            connect: vi.fn()
        }
    }));

    vi.mock('bcrypt');
    vi.mock('jsonwebtoken');

    describe('Auth routes', () => {
        beforeEach(() => {
            vi.clearAllMocks();
        });

        describe('POST /auth/login', () => {
            it('should return 200 and a token when credentials are valid', async () => {
                // Mock database client
                const mockClient = {
                    query: vi.fn().mockResolvedValue({
                        rows: [{ id: 1, username: 'testuser', password: 'hashedpassword' }]
                    }),
                    release: vi.fn()
                };

                require('../services/dbService').pool.connect.mockResolvedValue(mockClient);

                // Mock bcrypt comparison to return true
                bcrypt.compare.mockResolvedValue(true);

                // Mock JWT sign to return a token
                jwt.sign.mockReturnValue('valid-token');

                const res = await request(app)
                    .post('/auth/login')
                    .send({ identifier: 'testuser', password: 'password123' });

                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('token');
                expect(res.body.token).toBe('valid-token');
                expect(mockClient.query).toHaveBeenCalledWith(
                    'SELECT * FROM users WHERE username = $1 OR email = $1',
                    ['testuser']
                );
            });

            it('should return 401 when user does not exist', async () => {
                // Mock database client with empty result
                const mockClient = {
                    query: vi.fn().mockResolvedValue({ rows: [] }),
                    release: vi.fn()
                };

                require('../services/dbService').pool.connect.mockResolvedValue(mockClient);

                const res = await request(app)
                    .post('/auth/login')
                    .send({ identifier: 'nonexistentuser', password: 'password123' });

                expect(res.statusCode).toBe(401);
                expect(res.body).toHaveProperty('error');
            });

            it('should return 401 when password is incorrect', async () => {
                // Mock database client
                const mockClient = {
                    query: vi.fn().mockResolvedValue({
                        rows: [{ id: 1, username: 'testuser', password: 'hashedpassword' }]
                    }),
                    release: vi.fn()
                };

                require('../services/dbService').pool.connect.mockResolvedValue(mockClient);

                // Mock bcrypt comparison to return false (invalid password)
                bcrypt.compare.mockResolvedValue(false);

                const res = await request(app)
                    .post('/auth/login')
                    .send({ identifier: 'testuser', password: 'wrongpassword' });

                expect(res.statusCode).toBe(401);
                expect(res.body).toHaveProperty('error');
            });

            it('should return 400 when request body is missing required fields', async () => {
                const res = await request(app)
                    .post('/auth/login')
                    .send({});

                expect(res.statusCode).toBe(400);
            });
        });
    });
});

