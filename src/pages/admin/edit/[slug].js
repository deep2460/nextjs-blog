import { useEffect, useState } from 'react';
import useSecurePage from '@/hooks/useSecurePage';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false });

export default function EditPost() {
  const { isReady, user } = useSecurePage(); // ✅ still first hook
  const router = useRouter();
  const { slug } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ✅ move conditional render below all hooks
  useEffect(() => {
    if (isReady && slug) {
      axios.get(`/api/posts/${slug}`)
        .then((res) => {
          const post = res.data.post;
          setTitle(post.title);
          setContent(post.content);
          setLoading(false);
        })
        .catch(() => {
          alert('Post not found');
          router.push('/admin');
        });
    }
  }, [isReady, slug, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`/api/posts/${slug}`, { title, content });
      router.push('/admin');
    } catch (err) {
      alert('Failed to update post');
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ after all hooks, safe to block render
  if (!isReady || loading) return <p className="p-8">Loading post...</p>;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Content</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {submitting ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
}
