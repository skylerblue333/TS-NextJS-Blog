import express from 'express';
import { z } from 'zod';

export const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));

const PostSchema = z.object({
  title: z.string().trim().min(3).max(120),
  content: z.string().trim().min(10).max(10000),
  tags: z.array(z.string().trim().min(1).max(32)).max(8).default([]),
});

export interface Post {
  id: number;
  title: string;
  content: string;
  tags: string[];
  publishedAt: string;
}

const posts: Post[] = [];
let nextId = 1;

export function resetPosts(): void {
  posts.length = 0;
  nextId = 1;
}

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok', service: 'sky-content-api' });
});

app.get('/readyz', (_req, res) => {
  res.json({ status: 'ready', posts: posts.length });
});

app.post('/v1/posts', (req, res) => {
  const parsed = PostSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: 'invalid post payload' });
    return;
  }

  const post: Post = {
    id: nextId++,
    ...parsed.data,
    publishedAt: new Date().toISOString(),
  };
  posts.push(post);
  res.status(201).json(post);
});

app.get('/v1/posts', (req, res) => {
  const limit = z.coerce.number().int().min(1).max(100).catch(20).parse(req.query.limit);
  res.json({ items: posts.slice(-limit).reverse(), count: posts.length });
});

app.get('/v1/posts/:id', (req, res) => {
  const id = z.coerce.number().int().positive().safeParse(req.params.id);
  if (!id.success) {
    res.status(400).json({ error: 'invalid post id' });
    return;
  }
  const post = posts.find((item) => item.id === id.data);
  if (!post) {
    res.status(404).json({ error: 'post not found' });
    return;
  }
  res.json(post);
});

if (require.main === module) {
  const port = Number.parseInt(process.env.PORT ?? '3000', 10);
  app.listen(port, () => console.log(`sky-content-api listening on port ${port}`));
}
