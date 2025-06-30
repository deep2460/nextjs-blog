import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data.posts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (confirm(`Delete post "${slug}"?`)) {
      try {
        await axios.delete(`/api/posts/${slug}`);
        fetchPosts(); // Refresh after delete
      } catch (error) {
        alert('Failed to delete post');
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <Link href="/admin/create" className="inline-block bg-blue-600 text-white px-4 py-2 rounded mb-4">
        + Create New Post
      </Link>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id} className="border p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="text-sm text-gray-500">Slug: {post.slug}</p>
                  <p className="text-sm text-gray-400">Created: {new Date(post.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/posts/${post.slug}`} className="text-blue-500 underline">
                    View
                  </Link>
                  <Link href={`/admin/edit/${post.slug}`} className="text-yellow-600 underline">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(post.slug)} className="text-red-600 underline">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
