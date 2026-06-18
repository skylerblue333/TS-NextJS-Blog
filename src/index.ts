import React from 'react';

// Mock Next.js page component
export default function Home({ posts }: { posts: any[] }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>Technical Blog</h1>
      <p>Thoughts on Software Engineering, Architecture, and TS.</p>
      
      <div style={{ marginTop: '2rem' }}>
        {posts?.map(post => (
          <article key={post.id} style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <h2>{post.title}</h2>
            <div style={{ color: '#666', marginBottom: '1rem' }}>{post.date}</div>
            <p>{post.excerpt}</p>
            <a href={`/posts/${post.slug}`} style={{ color: 'blue' }}>Read more →</a>
          </article>
        ))}
      </div>
    </div>
  );
}

// Mock getStaticProps
export async function getStaticProps() {
  const posts = [
    {
      id: 1,
      title: 'Building Scalable Microservices',
      slug: 'scalable-microservices',
      date: '2023-10-15',
      excerpt: 'Learn how to design microservices that scale to millions of users.'
    },
    {
      id: 2,
      title: 'TypeScript Advanced Types',
      slug: 'ts-advanced-types',
      date: '2023-11-02',
      excerpt: 'Deep dive into mapped types, conditional types, and infer.'
    }
  ];

  return {
    props: { posts }
  };
}