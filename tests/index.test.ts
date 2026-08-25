import request from 'supertest';
import { app, resetPosts } from '../src/index';

describe('Sky Content API', () => {
  beforeEach(() => resetPosts());

  it('reports health and readiness', async () => {
    expect((await request(app).get('/healthz')).status).toBe(200);
    const ready = await request(app).get('/readyz');
    expect(ready.status).toBe(200);
    expect(ready.body.posts).toBe(0);
  });

  it('creates, lists, and retrieves bounded posts', async () => {
    const created = await request(app)
      .post('/v1/posts')
      .send({ title: 'Engineering Notes', content: 'A bounded test post body.', tags: ['sky'] });
    expect(created.status).toBe(201);
    expect(created.body.id).toBe(1);

    const listed = await request(app).get('/v1/posts?limit=1');
    expect(listed.status).toBe(200);
    expect(listed.body.count).toBe(1);
    expect(listed.body.items[0].title).toBe('Engineering Notes');

    const fetched = await request(app).get('/v1/posts/1');
    expect(fetched.status).toBe(200);
    expect(fetched.body.tags).toEqual(['sky']);
  });

  it('rejects invalid content and missing posts', async () => {
    expect((await request(app).post('/v1/posts').send({ title: 'x', content: 'short' })).status).toBe(400);
    expect((await request(app).get('/v1/posts/nope')).status).toBe(400);
    expect((await request(app).get('/v1/posts/999')).status).toBe(404);
  });
});
