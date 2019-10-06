import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';

import Company from '../../src/app/models/Company';

describe('session', () => {
  beforeEach(async () => {
    await truncate();

    await Company.create({
      social_name: 'COMPANY',
      fantasy_name: 'COMPANY INC.',
      cnpj: 'CNPJ',
      password: 'PASSWORD',
    });
  });

  it('should be return error with invalid CNPJ', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        cnpj: '04.687.857/-82',
        password: '04.687.857/-82',
      });

    expect(response.status).toBe(404);
  });

  it('should be return error with invalid password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        cnpj: 'CNPJ',
        password: '04.687.857/-82',
      });

    expect(response.status).toBe(401);
  });

  it('should be return jwt token with valid credentials', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        cnpj: 'CNPJ',
        password: 'PASSWORD',
      });

    expect(response.body).toHaveProperty('token');
  });
});
