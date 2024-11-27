import { Button, Form, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';

import withAuth from '@/hoc/withAuth';

import api from '@/utils/api';

interface Profile {
  name: string;
  title: string;
  description: string[];
}

const AdminProfile: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get<Profile>('/profile');
        const { name, title, description } = response.data;

        form.setFieldsValue({
          name,
          title,
          description: description.join('\n'),
        });
      } catch (error) {
        message.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, [form]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const updatedProfile = {
        ...values,
        description: values.description
          .split('\n')
          .map((line: string) => line.trim()),
      };

      await api.put('/profile', updatedProfile);
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: '600px', margin: '0 auto', marginTop: '50px' }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Name is required!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Title is required!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Description is required!' }]}
      >
        <Input.TextArea
          rows={6}
          placeholder="Enter each description on a new line"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default withAuth(AdminProfile);
