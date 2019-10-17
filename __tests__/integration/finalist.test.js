import request from 'supertest';

import app from '../../src/app';

import truncate from '../util/truncate';
import factory from '../factories';

describe('Finalist', () => {
  beforeAll(async () => {
    // await truncate();

    await factory.create('Company', {
      id: 50,
      password: 'PASSWORD',
    });

    await factory.createMany('Finalist', 10);
  });

  it('must be listed with the finalist structure', async () => {
    const sessionResponse = await request(app)
      .post('/sessions')
      .send({
        id: 50,
        password: 'PASSWORD',
      });

    const response = await request(app)
      .get('/finalists')
      .set('Authorization', `Bearer ${sessionResponse.body.token}`);

    expect(response.body).toHaveProperty(['finalists', 0, 'category', 'name']);
    expect(response.body).toHaveProperty(['finalists', 0, 'category', 'size']);
    expect(response.body).toHaveProperty(['finalists', 0, 'company', 'cnpj']);
    expect(response.body).toHaveProperty([
      'finalists',
      0,
      'company',
      'fantasy_name',
    ]);
    expect(response.body).toHaveProperty([
      'finalists',
      0,
      'company',
      'social_name',
    ]);
    expect(response.body).toHaveProperty(['finalists', 0, 'id']);
    expect(response.body).toHaveProperty(['finalists', 0, 'owner_name']);
  });
});
