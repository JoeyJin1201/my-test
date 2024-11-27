import { Button, Form, Input, message, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';

import withAuth from '@/hoc/withAuth';

import api from '@/utils/api';

interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

const AdminExperience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editingExperience, setEditingExperience] =
    useState<Partial<Experience> | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await api.get<Experience[]>('/experience');
        setExperiences(response.data);
      } catch (error) {
        message.error('Failed to load experiences');
      }
    };

    fetchExperiences();
  }, []);

  const handleAdd = () => {
    setEditingExperience(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Experience) => {
    setEditingExperience(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this experience?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/experience?id=${id}`);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
      message.success('Experience deleted successfully');
    } catch (error) {
      message.error('Failed to delete experience');
    }
  };

  const handleSubmit = async (values: Experience) => {
    try {
      if (editingExperience) {
        await api.put(`/experience?id=${editingExperience.id}`, values);
        setExperiences((prev) =>
          prev.map((exp) =>
            exp.id === editingExperience.id ? { ...exp, ...values } : exp,
          ),
        );
        message.success('Experience updated successfully');
      } else {
        const response = await api.post('/experience', values);
        setExperiences((prev) => [...prev, response.data]);
        message.success('Experience added successfully');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save experience');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Experience) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => confirmDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Button
        type="primary"
        onClick={handleAdd}
        style={{ marginBottom: '20px' }}
      >
        Add Experience
      </Button>
      <Table columns={columns} dataSource={experiences} rowKey="id" />
      <Modal
        title={editingExperience ? 'Edit Experience' : 'Add Experience'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Title is required!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company"
            name="company"
            rules={[{ required: true, message: 'Company is required!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Start Date is required!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="End Date"
            name="endDate"
            rules={[{ required: true, message: 'End Date is required!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Description is required!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default withAuth(AdminExperience);
