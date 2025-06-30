import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts').then((res) => {
      setPosts(res.data.posts || []);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">📚 Welcome to Deepak&apos;s Blog</h1>
          <p className="mt-2 text-gray-600 text-lg">Explore posts created by the admin — live, secure, and cleanly styled.</p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-10">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-sm rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
              >
                <h2 className="text-xl font-semibold text-blue-700 hover:underline line-clamp-2">
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <div
                  className="mt-3 text-sm text-gray-700 line-clamp-4"
                  dangerouslySetInnerHTML={{
                    __html: post.content.slice(0, 200) + '...',
                  }}
                />
                <Link
                  href={`/posts/${post.slug}`}
                  className="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="text-center py-6 text-sm text-gray-500">
        <p>
          Built by Deepak | <Link href="/admin/login" className="text-blue-600 hover:underline">Admin Login</Link>
        </p>
      </footer>
    </main>
  );
}
