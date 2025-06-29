import { dbConnect } from '@/lib/db';
import Post from '@/models/Post';

export default async function handler(req, res) {
  await dbConnect();
  const { slug } = req.query;

  if (req.method === 'GET') {
    const post = await Post.findOne({ slug });
    return post ? res.status(200).json(post) : res.status(404).json({ error: 'Not found' });
  }

  if (req.method === 'PUT') {
    const { title, content } = req.body;
    const updated = await Post.findOneAndUpdate({ slug }, { title, content }, { new: true });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    await Post.findOneAndDelete({ slug });
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}
