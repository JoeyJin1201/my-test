import React from 'react';
import Link from 'next/link';
import { Layout, Menu, Switch } from 'antd';
import { useTheme } from '@/context/ThemeProvider';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Header>
      <div style={{ float: 'left', color: '#fff', fontWeight: 'bold' }}>
        <Link href="/">My Portfolio</Link>
      </div>
      <Menu
        theme={isDarkMode ? 'dark' : 'light'}
        mode="horizontal"
        style={{ float: 'right' }}
        items={[
          { key: '1', label: <Link href="#profile">Profile</Link> },
          { key: '2', label: <Link href="#projects">Projects</Link> },
          { key: '3', label: <Link href="#contact">Contact</Link> },
        ]}
      />
      <Switch
        checked={isDarkMode}
        onChange={toggleTheme}
        style={{ marginLeft: '20px' }}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </Header>
  );
};

export default AppHeader;
