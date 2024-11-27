import React from 'react';

import useWindowSize from '@/hooks/useWindowSize';

import * as style from './HeaderTabs.style';

interface HeaderTabsProps {
  activeKey: string;
  onTabClick: (key: string) => void;
  onTabChange: (key: string) => void;
}

const HeaderTabs: React.FC<HeaderTabsProps> = ({ activeKey, onTabClick, onTabChange }) => {
  const { width } = useWindowSize();

  const items = [
    { key: 'profile', label: 'Profile' },
    { key: 'skills', label: 'Skills' },
    { key: 'experience', label: 'Experience' },
    { key: 'projects', label: 'Projects' },
    { key: 'contact', label: 'Contact' },
    ...(width && width > 768 ? [{ key: 'admin', label: 'Admin' }] : []),
  ].filter(Boolean);

  return (
    <style.CustomTabs
      activeKey={activeKey}
      onTabClick={onTabClick}
      onChange={onTabChange}
      items={items}
    />
  );
};

export default HeaderTabs;
