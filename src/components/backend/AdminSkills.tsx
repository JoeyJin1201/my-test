import React, { useEffect, useState } from 'react';
import { Table, Form, Input, Button, Modal, message, Space } from 'antd';
import axios from 'axios';

interface Skill {
  id: number;
  name: string;
  category: string;
}

const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get<Skill[]>('/api/skills');
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

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/skills/${id}`);
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
      message.success('Skill deleted successfully');
    } catch (error) {
      message.error('Failed to delete skill');
    }
  };

  const handleSubmit = async (values: Skill) => {
    try {
      if (editingSkill) {
        await axios.put(`/api/skills/${editingSkill.id}`, values);
        setSkills((prev) =>
          prev.map((skill) =>
            skill.id === editingSkill.id ? { ...skill, ...values } : skill
          )
        );
        message.success('Skill updated successfully');
      } else {
        const response = await axios.post('/api/skills', values);
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
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Skill) => (
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
        Add Skill
      </Button>
      <Table columns={columns} dataSource={skills} rowKey="id" />
      <Modal
        title={editingSkill ? 'Edit Skill' : 'Add Skill'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Category" name="category" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminSkills;
