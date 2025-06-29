import React, { useEffect, useState } from 'react';
import { dbConnect } from '@/lib/db';
import Post from '@/models/Post';

export default function PostPage({ post }) {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
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

