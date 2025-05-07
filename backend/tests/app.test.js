const request = require('supertest');
const app = require('../app');

describe('Basic route test', () => {
  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/randomroute');
    expect(res.statusCode).toBe(404);
  });

  it('should return 200 from /auth or /users (if route exists)', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});

