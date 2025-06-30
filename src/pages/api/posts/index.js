import dbConnect from '@/lib/dbconnect';
import Post from '@/models/Post';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await dbConnect();
      const posts = await Post.find().sort({ createdAt: -1 });
      res.status(200).json({ posts });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
