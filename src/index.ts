import express from 'express';
import { z } from 'zod';

export const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'TS-NextJS-Blog' });
});

const PostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10)
});

const posts: any[] = [];

app.post('/api/posts', (req, res) => {
  try {
    const data = PostSchema.parse(req.body);
    const post = { id: posts.length + 1, ...data, published: new Date().toISOString() };
    posts.push(post);
    res.json(post);
  } catch (e) {
    res.status(400).json({ error: 'Invalid post data' });
  }
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});


if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}
