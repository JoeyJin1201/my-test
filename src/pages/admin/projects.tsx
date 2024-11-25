import React from 'react';
import { Layout, Typography, Card } from 'antd';

import AdminProjects from '@/components/backend/AdminProjects';

const { Title } = Typography;
const { Content } = Layout;

const ProjectsAdminPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ padding: '24px' }}>
        <Title level={3} style={{ marginBottom: '16px' }}>
          Projects Management
        </Title>
        <Card style={{ padding: '16px' }}>
          <AdminProjects />
        </Card>
      </Content>
    </Layout>
  );
};

export default ProjectsAdminPage;
