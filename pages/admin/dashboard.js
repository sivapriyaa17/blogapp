import Link from 'next/link';
import { dbConnect } from '@/lib/db';
import Post from '@/models/Post';
import axios from 'axios';

export async function getServerSideProps() {
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 }).lean();
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
}

export default function Dashboard({ posts }) {
  const handleDelete = async (slug) => {
    await axios.delete(`/api/posts/${slug}`);
    location.reload();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <Link href="/admin/create" className="text-blue-500 underline">+ Create New Post</Link>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="border p-4">
            <h2>{post.title}</h2>
            <div className="flex gap-4 mt-2">
              <Link href={`/admin/edit/${post.slug}`} className="text-green-600">Edit</Link>
              <button onClick={() => handleDelete(post.slug)} className="text-red-600">Delete</button>
              <Link href={`/posts/${post.slug}`} className="text-blue-600">View</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
