import React, { useEffect, useState } from 'react';
import { Table, Form, Input, Button, Modal, message, Space } from 'antd';
import axios from 'axios';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>('/api/projects');
        setProjects(response.data);
      } catch (error) {
        message.error('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, []);

  const handleAdd = () => {
    setEditingProject(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Project) => {
    setEditingProject(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects((prev) => prev.filter((project) => project.id !== id));
      message.success('Project deleted successfully');
    } catch (error) {
      message.error('Failed to delete project');
    }
  };

  const handleSubmit = async (values: Project) => {
    try {
      if (editingProject) {
        // Update project
        await axios.put(`/api/projects/${editingProject.id}`, values);
        setProjects((prev) =>
          prev.map((project) =>
            project.id === editingProject.id ? { ...project, ...values } : project
          )
        );
        message.success('Project updated successfully');
      } else {
        // Add new project
        const response = await axios.post('/api/projects', values);
        setProjects((prev) => [...prev, response.data]);
        message.success('Project added successfully');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save project');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (url: string) => <img src={url} alt="project" style={{ maxWidth: '100px' }} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Project) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: '20px' }}>
        Add Project
      </Button>
      <Table columns={columns} dataSource={projects} rowKey="id" />
      <Modal
        title={editingProject ? 'Edit Project' : 'Add Project'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Image URL" name="image" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProjects;
