import { Card, Spin, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import * as style from './Skills.style';

interface Skill {
  id: number;
  name: string;
  icon: string;
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get<Skill[]>('/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <style.Container>
        <Spin size="large" />
      </style.Container>
    );
  }

  return (
    <style.Container>
      <Typography.Title
        level={2}
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        My Skills
      </Typography.Title>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {skills.map((skill) => (
          <Card>{skill.name}</Card>
        ))}
      </div>
    </style.Container>
  );
};

export default Skills;
