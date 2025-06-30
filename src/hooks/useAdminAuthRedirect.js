// src/hooks/useAdminAuthRedirect.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function useAdminAuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    // ✅ run only on client
    if (typeof window === 'undefined') return;

    const check = async () => {
      try {
        const res = await axios.get('/api/auth/me', { withCredentials: true });
        if (res.data.authenticated) {
          router.replace('/admin'); // Already logged in → redirect to admin
        }
      } catch {
        // Not logged in → stay on login page
      }
    };

    check();
  }, [router]);
}
