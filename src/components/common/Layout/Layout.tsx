import { Layout } from 'antd';
import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import AppFooter from '../Footer';
import AppHeader from '../Header/Header';

import * as style from './Layout.style';

interface LayoutProps {
  children: ReactNode;
  currentBlock: string;
  setCurrentBlock: Dispatch<SetStateAction<string>>;
}

const AppLayout: React.FC<LayoutProps> = ({
  currentBlock,
  setCurrentBlock,
  children,
}) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppHeader
        currentBlock={currentBlock}
        setCurrentBlock={setCurrentBlock}
      />
      <style.CustomLayoutContent data-current-block={currentBlock}>
        {children}
      </style.CustomLayoutContent>
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;
