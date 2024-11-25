import React, { useState } from 'react';
import Link from 'next/link';
import { Layout, Button, Drawer, Menu, Switch } from 'antd';
import { useTheme } from '@/context/ThemeProvider';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const menuItems = [
    { key: 'home', label: <Link href="/">Home</Link> },
    { key: 'about', label: <Link href="#about">About</Link> },
    { key: 'contact', label: <Link href="#contact">Contact</Link> },
    ...(user
      ? [
          { key: 'profile', label: <Link href="/admin/profile" onClick={() => setDrawerVisible(false)}>Profile Management</Link> },
          { key: 'projects', label: <Link href="/admin/projects" onClick={() => setDrawerVisible(false)}>Projects Management</Link> },
          { key: 'skills', label: <Link href="/admin/skills" onClick={() => setDrawerVisible(false)}>Skills Management</Link> },
          {
            key: 'logout',
            label: (
              <Button type="link" danger onClick={handleLogout}>
                Logout
              </Button>
            ),
          },
        ]
      : [
          {
            key: 'login',
            label: (
              <Button type="link" onClick={() => router.push('/login')}>
                Login
              </Button>
            ),
          },
        ]),
  ];

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Logo */}
      <div style={{ color: '#fff', fontWeight: 'bold' }}>
        <Link href="/">My Portfolio</Link>
      </div>

      {/* 主題切換與漢堡按鈕 */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          style={{ marginRight: '16px' }}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />
        <Button type="primary" onClick={toggleDrawer}>
          ☰
        </Button>
      </div>

      {/* 漢堡選單 */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        visible={drawerVisible}
        width={250}
      >
        <Menu mode="vertical" items={menuItems} />
      </Drawer>
    </Header>
  );
};

export default AppHeader;
