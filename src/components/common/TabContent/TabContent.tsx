import Contact from '@/components/frontend/Contact/Contact';
import Experience from '@/components/frontend/Experience/Experience';
import Profile from '@/components/frontend/Profile/Profile';
import Projects from '@/components/frontend/Projects/Projects';
import Skills from '@/components/frontend/Skills/Skills';
import React from 'react';

import * as style from './TabContent.style';

interface TabContentProps {
  sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
  activeKey: string;
  sectionArray: string[];
  animationStarted: Record<string, boolean>; // 动画状态
}

const sectionMap = (section: string, animationStarted: boolean) => {
  const commonProps = { startAnimation: animationStarted };
  switch (section) {
    case 'profile':
      return <Profile {...commonProps} />;
    case 'skills':
      return <Skills {...commonProps} />;
    case 'experience':
      return <Experience {...commonProps} />;
    case 'projects':
      return <Projects {...commonProps} />;
    case 'contact':
      return <Contact {...commonProps} />;
    default:
      return <></>;
  }
};

const TabContent: React.FC<TabContentProps> = ({
  sectionRefs,
  activeKey,
  sectionArray,
  animationStarted,
}) => {
  return (
    <style.SectionsContainer $activeKey={activeKey}>
      {sectionArray.map((section, index) => (
        <style.StyledSection
          key={section}
          id={section}
          $activeKey={activeKey}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          style={{
            height: section === 'profile' ? 'calc(100vh - 36px)' : undefined,
            maxHeight: section === 'contact' ? 'calc(100vh - 36px)' : undefined,
          }}
        >
          <style.SectionContentWrap>
            {sectionMap(section, animationStarted[section] || false)}
          </style.SectionContentWrap>
        </style.StyledSection>
      ))}
    </style.SectionsContainer>
  );
};

export default TabContent;
