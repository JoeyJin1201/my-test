import React from 'react';

import * as style from './HeaderTabs.style';

interface HeaderTabsProps {
  activeKey: string;
  onTabChange: (key: string) => void;
}

const HeaderTabs: React.FC<HeaderTabsProps> = ({ activeKey, onTabChange }) => {
  return (
    <style.CustomTabs
      activeKey={activeKey}
      onChange={onTabChange}
      items={[
        { key: 'profile', label: 'Profile' },
        { key: 'skills', label: 'Skills' },
        { key: 'experience', label: 'Experience' },
        { key: 'projects', label: 'Projects' },
        { key: 'contact', label: 'Contact' },
      ]}
    />
  );
};

export default HeaderTabs;
