import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Typography.Text>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</Typography.Text>
      <br />
      <Typography.Text>
        Built with <span style={{ color: 'red' }}>♥</span> using Next.js and Ant Design.
      </Typography.Text>
    </Footer>
  );
};

export default AppFooter;
