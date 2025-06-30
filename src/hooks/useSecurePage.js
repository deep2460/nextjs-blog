// src/hooks/useSecurePage.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function useSecurePage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null); // optional if you want username

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('/api/auth/me');
        setUser(res.data.user); // e.g. "admin"
        setIsReady(true);
      } catch (err) {
        toast.error('Session expired. Please log in again.');
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router]);

  return { isReady, user };
}
