import React, { useEffect, useState } from 'react';
import { Timeline, Typography, Spin } from 'antd';
import axios from 'axios';

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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        My Experience
      </Typography.Title>
      <Timeline>
        {experiences.map((exp) => (
          <Timeline.Item key={exp.id}>
            <Typography.Title level={4}>{exp.title} @ {exp.company}</Typography.Title>
            <Typography.Text>{exp.startDate} - {exp.endDate}</Typography.Text>
            <p>{exp.description}</p>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};

export default Experience;
