import React, { useState } from 'react';
import { Tabs, Typography, Layout } from 'antd';

import AdminSkills from '@/components/backend/AdminSkills';
import AdminProfile from '@/components/backend/AdminProfile';
import AdminProjects from '@/components/backend/AdminProjects';

const { Title } = Typography;
const { Header, Content } = Layout;

const AdminDashboard: React.FC = () => {
  const [activeKey, setActiveKey] = useState<'skills' | 'profile' | 'projects'>('skills');

  const renderContent = () => {
    switch (activeKey) {
      case 'skills':
        return <AdminSkills />;
      case 'profile':
        return <AdminProfile />;
      case 'projects':
        return <AdminProjects />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', padding: '0 24px' }}>
        <Title level={3} style={{ color: '#fff', margin: 0 }}>
          Admin Dashboard
        </Title>
      </Header>
      <Content style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
        <Tabs
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key as 'skills' | 'profile' | 'projects')}
          tabBarStyle={{ marginBottom: '24px' }}
          items={[
            { key: 'skills', label: 'Skills' },
            { key: 'profile', label: 'Profile' },
            { key: 'projects', label: 'Projects' },
          ]}
        />
        <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px' }}>
          {renderContent()}
        </div>
      </Content>
    </Layout>
  );
};

export default AdminDashboard;
