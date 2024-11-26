import { Timeline, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import * as style from './Experience.style';

interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

const Experience: React.FC = () => {
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
      <div style={{ marginBottom: '16px' }}>
        <Typography.Title level={4} style={{ marginBottom: '4px' }}>
          {exp.title} @ {exp.company}
        </Typography.Title>
        <Typography.Text>
          {exp.startDate} - {exp.endDate}
        </Typography.Text>
      </div>
    ),
    children: (
      <div style={{ paddingLeft: '16px' }}>
        <Typography.Text>{exp.description}</Typography.Text>
      </div>
    ),
  }));

  return (
    <style.Container>
      <Typography.Title
        level={2}
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        My Experience
      </Typography.Title>
      <Timeline items={timelineItems} />
    </style.Container>
  );
};

export default Experience;
