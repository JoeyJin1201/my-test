import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Table,
} from 'antd';
import React, { useEffect, useState } from 'react';

import withAuth from '@/hoc/withAuth';

import api from '@/utils/api';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

const categoryOptions = ['Frontend', 'Backend', 'DevOps'];

const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get<Skill[]>('/skills');
        setSkills(response.data);
      } catch (error) {
        message.error('Failed to fetch skills');
      }
    };

    fetchSkills();
  }, []);

  const handleAdd = () => {
    setEditingSkill(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Skill) => {
    setEditingSkill(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this skill?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/skills/${id}`);
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
      message.success('Skill deleted successfully');
    } catch (error) {
      message.error('Failed to delete skill');
    }
  };

  const handleSubmit = async (values: Skill) => {
    try {
      if (editingSkill) {
        await api.put(`/skills/${editingSkill.id}`, values);
        setSkills((prev) =>
          prev.map((skill) =>
            skill.id === editingSkill.id ? { ...skill, ...values } : skill,
          ),
        );
        message.success('Skill updated successfully');
      } else {
        const response = await api.post('/skills', values);
        setSkills((prev) => [...prev, response.data]);
        message.success('Skill added successfully');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Failed to save skill');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Proficiency',
      dataIndex: 'proficiency',
      key: 'proficiency',
      render: (proficiency: number) => `${proficiency}%`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Skill) => (
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
        Add Skill
      </Button>
      <Table columns={columns} dataSource={skills} rowKey="id" />
      <Modal
        title={editingSkill ? 'Edit Skill' : 'Add Skill'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Please input the skill name!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select the category!' }]}
          >
            <Select
              options={categoryOptions.map((category) => ({
                label: category,
                value: category,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Proficiency"
            name="proficiency"
            rules={[
              { required: true, message: 'Please input the proficiency!' },
              {
                type: 'number',
                min: 0,
                max: 100,
                message: 'Proficiency must be between 0 and 100!',
              },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default withAuth(AdminSkills);
