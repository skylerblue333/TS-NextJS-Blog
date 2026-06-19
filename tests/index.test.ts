import request from 'supertest';
import { app } from '../src/index';

describe('TS-NextJS-Blog', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('should create and list posts', async () => {
    const res1 = await request(app).post('/api/posts').send({ title: 'My Post', content: 'Some long content here' });
    expect(res1.status).toBe(200);
    expect(res1.body.title).toBe('My Post');
    
    const res2 = await request(app).get('/api/posts');
    expect(res2.status).toBe(200);
    expect(res2.body.length).toBeGreaterThan(0);
  });

});
