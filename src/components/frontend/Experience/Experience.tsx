import { Spin, Timeline, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import KeyInText from '@/components/KeyInText/KeyInText';
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

  const timelineItems = experiences.map((exp) => ({
    key: exp.id,
    label: (
      <div>
        <Typography.Title
          level={4}
          style={{ marginBottom: '4px', fontSize: '1rem' }}
        >
          {exp.title} @ {exp.company}
        </Typography.Title>
        <Typography.Text style={{ fontSize: '0.875rem' }}>
          {exp.startDate} - {exp.endDate}
        </Typography.Text>
      </div>
    ),
    children: (
      <div style={{ paddingLeft: '16px' }}>
        <Typography.Text style={{ fontSize: '0.875rem' }}>
          {exp.description}
        </Typography.Text>
      </div>
    ),
  }));

  return (
    <style.Container>
      <h2>
        <KeyInText text="My Experience" startAnimation={startAnimation} />
      </h2>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Timeline
          mode="alternate"
          items={timelineItems}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
          }}
        />
      )}
    </style.Container>
  );
};

export default Experience;
