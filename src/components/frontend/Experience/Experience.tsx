import { Spin, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import KeyInText from '@/components/KeyInTextWithCursor/KeyInTextWithCursor';

import * as style from './Experience.style';

interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceProps {
  startAnimation: boolean; // 动画触发状态
}

const Experience: React.FC<ExperienceProps> = ({ startAnimation }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get<Experience[]>('/api/experience');
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <h2>
            <KeyInText text="My Experience" startAnimation={startAnimation} />
          </h2>
          <style.TimelineContainer>
            {experiences.map((exp, index) => (
              <style.TimelineItem key={exp.id} $isLeft={index % 2 === 0}>
                <style.TimelineDot />
                <style.TimelineContent $isLeft={index % 2 === 0}>
                  <style.Title>
                    {exp.title} @ {exp.company}
                  </style.Title>
                  <Typography.Text style={{ fontSize: '0.875rem' }}>
                    {exp.startDate} - {exp.endDate}
                  </Typography.Text>
                  <p style={{ marginTop: '8px', fontSize: '0.875rem' }}>
                    {exp.description}
                  </p>
                </style.TimelineContent>
              </style.TimelineItem>
            ))}
          </style.TimelineContainer>
        </>
      )}
    </>
  );
};

export default Experience;
