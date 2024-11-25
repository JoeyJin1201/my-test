import React from 'react';
import { Layout, Typography, Card } from 'antd';

import AdminSkills from '@/components/backend/AdminSkills';

import withAuth from '@/hoc/withAuth';

const { Title } = Typography;
const { Content } = Layout;

const SkillsAdminPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ padding: '24px' }}>
        <Title level={3} style={{ marginBottom: '16px' }}>
          Skills Management
        </Title>
        <Card style={{ padding: '16px' }}>
          <AdminSkills />
        </Card>
      </Content>
    </Layout>
  );
};

export default withAuth(SkillsAdminPage);
