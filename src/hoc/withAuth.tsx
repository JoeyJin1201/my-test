import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isAuthenticating, setIsAuthenticating] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
          router.push('/login');
          return;
        }

        try {
          // 验证 Token 是否有效
          const response = await fetch('/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!response.ok) {
            throw new Error('Invalid or expired token');
          }

          const { user: verifiedUser } = await response.json();
          if (!verifiedUser) {
            throw new Error('Unauthorized');
          }
        } catch (error) {
          console.error('Authentication error:', error);
          logout();
          router.push('/login');
        } finally {
          setIsAuthenticating(false);
        }
      };

      checkAuth();
    }, [logout, router]);

    if (isAuthenticating) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
