const request = require('supertest');
const app = require('../index'); // adjust if needed

describe('Auth Routes', () => {
  it('should register user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'test', email: 'test@test.com', password: '123456' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});
