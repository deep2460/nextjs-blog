import dbConnect from '@/lib/dbconnect';
import Post from '@/models/Post';
import { verifyAdmin } from '@/lib/verifyAdmin';

export default async function handler(req, res) {
  try {
    await dbConnect();
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (err) {
    console.error('⛔ API /api/posts failed:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
