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
}

const sectionMap = (section: string) => {
  switch (section) {
    case 'profile':
      return <Profile />;
    case 'skills':
      return <Skills />;
    case 'experience':
      return <Experience />;
    case 'projects':
      return <Projects />;
    case 'contact':
      return <Contact />;
    default:
      return <></>;
  }
};

const TabContent: React.FC<TabContentProps> = ({
  sectionRefs,
  activeKey,
  sectionArray,
}) => {
  return (
    <style.SectionContainer $activeKey={activeKey}>
      {sectionArray.map((section, index) => (
        <style.StyledSection
          id={section}
          $activeKey={activeKey}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
        >
          {sectionMap(section)}
        </style.StyledSection>
      ))}
    </style.SectionContainer>
  );
};

export default TabContent;
