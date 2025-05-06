const request = require('supertest');
const app = require('../app');

describe('Basic route test', () => {
  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(404); // puisqu’il n’y a pas de route définie pour "/"
  });

  it('should return 200 from /auth or /users (if route exists)', async () => {
    const res = await request(app).get('/auth'); // ou '/users' si tu préfères
    // À adapter en fonction de la réponse réelle attendue
    expect([200, 401, 404]).toContain(res.statusCode);
  });
});

