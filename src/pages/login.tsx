import { Button, Form, Input, Typography, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useAuth } from '@/context/AuthContext';

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) return;

      try {
        const response = await fetch('/api/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          message.success('Already logged in!');
          await router.push('/admin');
        }
      } catch (error) {
        console.error('Token validation failed', error);
      }
    };

    checkAuth();
  }, [router]);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      // 调用后端登录 API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const { token } = await response.json();
      login(values.username, token); // 保存用户状态
      message.success('Login successful!');
      await router.push('/admin'); // 跳转到 /admin
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto' }}>
      <Title level={3}>Admin Login</Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
