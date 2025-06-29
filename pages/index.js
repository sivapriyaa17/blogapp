

import Link from 'next/link';
import { dbConnect } from '@/lib/db';
import Post from '@/models/Post';
import { useEffect, useState } from 'react';

export async function getServerSideProps() {
  await dbConnect();

  const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
  const formattedPosts = posts.map(post => ({
    ...post,
    createdAtFormatted: new Date(post.createdAt).toLocaleDateString(),
  }));

  return { props: { posts: JSON.parse(JSON.stringify(formattedPosts)) } };
}


export default function Home({ posts = [] }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">My Blog</h1>
      <Link href="/create">
        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
          Create New Post
        </button>
      </Link>
      {posts.length === 0 && <p>No posts found.</p>}
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.slug} className="border-b pb-4">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-2xl font-semibold text-blue-600 hover:underline">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">
              {isClient ? post.createdAtFormatted : ''}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
