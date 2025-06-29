import { dbConnect } from '@/lib/db';
import Post from '@/models/Post';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  await dbConnect();
  const { title, content, slug } = req.body;
  const post = await Post.create({ title, content, slug });
  res.status(201).json(post);
}
