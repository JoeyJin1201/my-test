import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import HeaderTabs from '@/components/common/Header/HeaderTabs';
import TabContent from '@/components/common/TabContent/TabContent';

const IndexPage = () => {
  const [activeKey, setActiveKey] = useState('profile');
  const [animationStarted, setAnimationStarted] = useState<
    Record<string, boolean>
  >({});
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const router = useRouter();

  const offset = 36;

  const sectionArray = [
    'profile',
    'skills',
    'experience',
    'projects',
    'contact',
  ];

  const handleScroll = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
      if (index !== -1) {
        const sectionKey = sectionArray[index];

        if (entry.isIntersecting) {
          setActiveKey(sectionKey);
          setAnimationStarted((prev) => ({
            ...prev,
            [sectionKey]: true,
          }));
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: `-${offset}px 0px 0px 0px`,
      threshold: 0.2,
    });

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [offset]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderTabs
        activeKey={activeKey}
        onTabClick={(key) => {
          console.log(key)
          if (key === 'admin') {
            router.push('/admin');
          }
        }}
        onTabChange={(key) => {
          const index = sectionArray.indexOf(key);
          if (index !== -1) {
            setActiveKey(key);
            const targetElement = sectionRefs.current[index];
            if (targetElement) {
              const headerHeight = offset;
              const targetPosition =
                targetElement.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
              });
            }
          }
        }}
      />
      <TabContent
        sectionRefs={sectionRefs}
        activeKey={activeKey}
        sectionArray={sectionArray}
        animationStarted={animationStarted}
      />
    </div>
  );
};

export default IndexPage;
