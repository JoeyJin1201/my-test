import { Tabs } from 'antd';
import dynamic from 'next/dynamic';

import withAuth from '@/components/hoc/withAuth';

const Profile = dynamic(() => import('@/components/backend/AdminProfile'), { ssr: false });
const Projects = dynamic(() => import('@/components/backend/AdminProjects'), { ssr: false });
const Skills = dynamic(() => import('@/components/backend/AdminSkills'), { ssr: false });

const { TabPane } = Tabs;

const AdminPage = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Admin Dashboard</h1>
      <Tabs defaultActiveKey="1" centered destroyInactiveTabPane>
        <TabPane tab="Profile" key="1">
          <Profile />
        </TabPane>
        <TabPane tab="Projects" key="2">
          <Projects />
        </TabPane>
        <TabPane tab="Skills" key="3">
          <Skills />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default withAuth(AdminPage);
