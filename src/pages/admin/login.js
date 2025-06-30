// src/pages/login.js

import { useState } from 'react';
import useAdminAuthRedirect from '@/hooks/useAdminAuthRedirect';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

import toast from 'react-hot-toast';



export default function LoginPage() {
  useAdminAuthRedirect();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        '/api/auth/login',
        { username, password },
        { withCredentials: true } // ✅ Required to store the cookie!
      );
      if (res.status === 200) {
        toast.success('Logged in successfully');
        router.push('/admin');
      }
    } catch (err) {
     // setError(err.response?.data?.error || 'Login failed');
     toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}

      <p className="mt-4 text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <Link href="/admin/signup" className="text-blue-600 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
