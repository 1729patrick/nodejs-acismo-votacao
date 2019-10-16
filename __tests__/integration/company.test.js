import request from 'supertest';

import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../factories';

describe('Company', () => {
  beforeAll(async () => {
    await factory.create('Company', {
      id: 1,
      password: 'PASSWORD',
    });
  });

  it('should be return error with invalid CNPJ', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        id: 2,
        password: 'PASSWORD',
      });

    expect(response.status).toBe(404);
  });

  it('should be return error with invalid password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        id: 1,
        password: '04.687.857/-82',
      });

    expect(response.status).toBe(401);
  });

  it('should be return jwt token with valid credentials', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        id: 1,
        password: 'PASSWORD',
      });

    expect(response.body).toHaveProperty('token');
  });
});
