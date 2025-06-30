import dbConnect from '@/lib/dbconnect';
import Post from '@/models/Post';

export default async function handler(req, res) {
    const { slug } = req.query;
    console.log('📥 API hit with slug:', slug);  // Should log a value
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const post = await Post.findOne({ slug });
            if (!post) return res.status(404).json({ error: 'Post not found' });
            return res.status(200).json({ post });
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching post' });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const deleted = await Post.findOneAndDelete({ slug });
            if (!deleted) return res.status(404).json({ error: 'Post not found' });
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: 'Error deleting post' });
        }
    } 


     if (req.method === 'PUT') {
        try {
            const { title, content } = req.body;
            const updated = await Post.findOneAndUpdate(
                { slug },
                { title, content },
                { new: true }
            );
            if (!updated) return res.status(404).json({ error: 'Post not found' });
            return res.status(200).json({ success: true, post: updated });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update post' });
        }
    }

     return res.status(405).json({ message: 'Method not allowed' });
    

   

}
