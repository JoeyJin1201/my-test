import React, { useState } from 'react';
import { Form, Input, Button, message, Typography, Space } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      await axios.post('/api/auth/login', values);
      message.success('Login successful!');
      // 跳轉到後台管理頁面
      window.location.href = '/admin';
    } catch (error) {
      message.error('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Admin Login
        </Title>
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </div>
  );
};

export default Login;
