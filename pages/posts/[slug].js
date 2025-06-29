import React, { useEffect, useState } from 'react';
import { dbConnect } from '@/lib/db';
import Post from '@/models/Post';


export default function PostPage({ post }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
export async function getServerSideProps(context) {
  await dbConnect();
  const slug = context.params.slug;
  const post = await Post.findOne({ slug }).lean();

  if (!post) {
    return { notFound: true };
  }

 
  post._id = post._id.toString();
  post.createdAt = post.createdAt?.toISOString();
  post.updatedAt = post.updatedAt?.toISOString();

  return { props: { post } };
}

