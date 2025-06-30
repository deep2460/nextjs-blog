import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import useAdminAuthRedirect from '@/hooks/useAdminAuthRedirect';
import toast from 'react-hot-toast';

export default function SignupPage() {
  useAdminAuthRedirect();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('/api/auth/signup', { username, password });
       toast.success(res.data.message || 'Signup successful!');
      setSuccess(res.data.message);
      setTimeout(() => router.push('/admin/login'), 1500);
    } catch (err) {
      //setError(err.response?.data?.error || 'Signup failed');
      toast.error(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Signup</h1>
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
          Sign Up
        </button>
      </form>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/admin/login" className="text-blue-600 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}