import { useEffect, useState } from 'react';
import useSecurePage from '@/hooks/useSecurePage';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const { isReady, user } = useSecurePage();
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ ALWAYS call hooks first
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      fetchPosts();
    }
  }, [isReady]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data.posts);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (confirm(`Delete post "${slug}"?`)) {
      try {
        await axios.delete(`/api/posts/${slug}`);
        toast.success('Post deleted');
        fetchPosts();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const handleLogout = async () => {
    await axios.post('/api/auth/logout');
    toast.success('Logged out');
    router.push('/admin/login');
  };

  // ✅ Defer rendering content until fully ready
  if (!mounted || !isReady) return null;

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <h1 className="text-2xl">Welcome, {user}</h1>
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">📋 Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-1 border border-red-500 text-red-600 rounded hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700">All Posts</h2>
          <Link
            href="/admin/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + New Post
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-400">No posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post._id}
                className="bg-white p-4 rounded shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-400">Slug: {post.slug}</p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex mt-3 sm:mt-0 gap-4 text-sm">
                  <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:underline">
                    View
                  </Link>
                  <Link href={`/admin/edit/${post.slug}`} className="text-yellow-600 hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(post.slug)} className="text-red-600 hover:underline ml-2">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
