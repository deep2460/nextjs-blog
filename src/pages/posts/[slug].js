import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostViewer() {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  console.log('📥 Request for slug:', slug);
  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/posts/${slug}`);
      setPost(res.data.post);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug) fetchPost();
  }, [slug]);

  if (loading) return <p className="p-8">Loading post...</p>;
  if (!post) return <p className="p-8 text-red-600">Post not found.</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <article
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
