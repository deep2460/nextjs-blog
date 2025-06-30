import dbConnect from '@/lib/dbconnect';
import Post from '@/models/Post';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
   console.log(req.body)
  const { title, content, slug } = req.body;

  try {
    await dbConnect();
    const post = await Post.create({ title, content, slug });
    res.status(200).json({ success: true, post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create post' });
  }
}