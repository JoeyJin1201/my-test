import { Button, Tabs, Typography } from 'antd';
import dynamic from 'next/dynamic';

import { useAuth } from '@/context/AuthContext';

import withAuth from '@/hoc/withAuth';

const { Text } = Typography;

const Profile = dynamic(() => import('@/components/backend/AdminProfile'), {
  ssr: false,
});
const Skills = dynamic(() => import('@/components/backend/AdminSkills'), {
  ssr: false,
});
const Experience = dynamic(
  () => import('@/components/backend/AdminExperience'),
  {
    ssr: false,
  },
);
const Projects = dynamic(() => import('@/components/backend/AdminProjects'), {
  ssr: false,
});

const AdminPage = () => {
  const { user, logout } = useAuth(); // 从 AuthContext 获取用户信息和登出方法

  // 定义 Tabs 的 items
  const items = [
    {
      label: 'Profile',
      key: '1',
      children: <Profile />,
    },
    {
      label: 'Skills',
      key: '2',
      children: <Skills />,
    },
    {
      label: 'Experience',
      key: '3',
      children: <Experience />,
    },
    {
      label: 'Projects',
      key: '4',
      children: <Projects />,
    },
    {
      label: 'User Info',
      key: '5',
      children: (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Text strong>Logged in as:</Text>
          <br />
          <Text>{user || 'Unknown User'}</Text>
          <div style={{ marginTop: '20px' }}>
            <Button type="primary" danger onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: '20px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>Admin Dashboard</h1>
      <Tabs
        defaultActiveKey="1"
        centered
        destroyInactiveTabPane
        items={items}
      />
    </div>
  );
};

export default withAuth(AdminPage);
