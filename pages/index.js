
import Link from 'next/link';
import { dbConnect } from '@/lib/db';
import Post from '@/models/Post';
import { useEffect, useState } from 'react';

export async function getServerSideProps() {
  await dbConnect();
  /*const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
}*/
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
        {posts.length === 0 && <p>No posts found.</p>}
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.slug} className="border-b pb-4">
              <a href={`/posts/${post.slug}`}>
                <h2 className="text-2xl font-semibold text-blue-600 hover:underline">{post.title}</h2>
              </a>
              <p className="text-sm text-gray-500">
                {isClient ? new Date(post.createdAt).toLocaleDateString() : ''}
              </p>
            </li>
          ))}
        </ul>
      </main>
    );




}


export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to the Blog!</h1>
      <p>This is the homepage.</p>
      <Link href="/create">Create a New Blog</Link>
    </div>
  );
}

