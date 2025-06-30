import { useState } from 'react';
import dynamic from 'next/dynamic';
import slugify from '@/utils/slugify';
import axios from 'axios';
import { useRouter } from 'next/router';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false });

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const slug = slugify(title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await axios.post('/api/posts/create', {
        title,
        content,
        slug,
      });
      if (res.status === 200) {
        router.push('/admin');
      }
    } catch (err) {
      alert('Error creating post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500 mt-1">Slug: <code>{slug}</code></p>
        </div>
        <div>
          <label className="block font-medium mb-1">Content</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitting ? 'Submitting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}
