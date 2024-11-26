import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { useEffect, useRef, useState } from 'react';

import HeaderTabs from '@/components/common/Header/HeaderTabs';
import TabContent from '@/components/common/TabContent/TabContent';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeProvider';

import '@/styles/globals.css';
import '@/styles/reset.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [activeKey, setActiveKey] = useState('profile');
  const [animationStarted, setAnimationStarted] = useState<
    Record<string, boolean>
  >({});
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const offset = 36; // Header 高度

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
          setActiveKey(sectionKey); // 更新 Tabs 的 activeKey

          // 启动 Key In 动画
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
      root: document.querySelector('.content'), // 只监听 Content 区域滚动
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
    <ConfigProvider
      theme={{
        hashed: false,
        token: { fontSize: 16, lineHeight: 1 },
        components: {
          Tabs: {
            inkBarColor: 'transparent',
            itemActiveColor: '#121212',
            itemColor: '#121212',
            itemHoverColor: '#121212',
            itemSelectedColor: '#121212',
          },
        },
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              paddingTop: '36px',
            }}
          >
            <HeaderTabs
              activeKey={activeKey}
              onTabChange={(key) => {
                setActiveKey(key);
                const index = sectionArray.indexOf(key);
                if (index !== -1) {
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
        </AuthProvider>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default MyApp;
