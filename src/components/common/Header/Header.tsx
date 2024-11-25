import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeProvider';
import { Button, Drawer, Layout, Menu, Switch } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useState } from 'react';

import * as style from './Header.style';

const { Header } = Layout;

interface HeaderProps {
  currentBlock: string;
  setCurrentBlock: Dispatch<SetStateAction<string>>;
}

const AppHeader: React.FC<HeaderProps> = ({
  currentBlock,
  setCurrentBlock,
}) => {
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
          {
            key: 'profile',
            label: (
              <Link
                href="/admin/profile"
                onClick={() => setDrawerVisible(false)}
              >
                Profile Management
              </Link>
            ),
          },
          {
            key: 'projects',
            label: (
              <Link
                href="/admin/projects"
                onClick={() => setDrawerVisible(false)}
              >
                Projects Management
              </Link>
            ),
          },
          {
            key: 'skills',
            label: (
              <Link
                href="/admin/skills"
                onClick={() => setDrawerVisible(false)}
              >
                Skills Management
              </Link>
            ),
          },
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
    <Header
      style={{
        width: '100%',
        position: 'fixed',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: '999',
      }}
    >
      <style.CustomAnchor
        direction="horizontal"
        bounds={0}
        targetOffset={64}
        getCurrentAnchor={() => currentBlock}
        onClick={(e) => {
          e.preventDefault();
        }}
        onChange={(currentActiveLink: string) => {
          setCurrentBlock(currentActiveLink || '#profile');
        }}
        items={[
          {
            key: 'profile',
            href: '#profile',
            title: 'Profile',
          },
          {
            key: 'skills',
            href: '#skills',
            title: 'Skills',
          },
          {
            key: 'experience',
            href: '#experience',
            title: 'Experience',
          },
          {
            key: 'projects',
            href: '#projects',
            title: 'Projects',
          },
        ]}
      />

      {/* 主題切換與漢堡按鈕 */}
      <div
        style={{ display: 'flex', alignItems: 'center', alignSelf: 'center' }}
      >
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
