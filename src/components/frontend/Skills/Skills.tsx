import { Card, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import KeyInText from '@/components/KeyInText/KeyInText';
import * as style from './Skills.style';

interface Skill {
  id: number;
  name: string;
  icon: string;
}

interface SkillsProps {
  startAnimation: boolean; // 是否启动动画
}

const Skills: React.FC<SkillsProps> = ({ startAnimation }) => {
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
      <h2>
        <KeyInText text="My Skills" startAnimation={startAnimation} />
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {skills.map((skill) => (
          <Card key={skill.id}>{skill.name}</Card>
        ))}
      </div>
    </style.Container>
  );
};

export default Skills;
