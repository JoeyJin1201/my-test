import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      if (!token || !storedUser) {
        router.push('/login');
      }
    }, [user, router]);

    if (!user) {
      return null; // 避免未完成跳轉前的閃爍
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
