import { Progress, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import KeyInText from '@/components/KeyInTextWithCursor/KeyInTextWithCursor';

import * as style from './Skills.style';

interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
  proficiency: number;
}

interface SkillsProps {
  startAnimation: boolean;
}

const Skills: React.FC<SkillsProps> = ({ startAnimation }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get<Skill[]>('/api/skills');
        const skillsWithProficiency = response.data.map((skill) => ({
          ...skill,
          proficiency: Math.floor(Math.random() * 50) + 50,
        }));
        setSkills(skillsWithProficiency);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <h2>
            <KeyInText text="My Skills" startAnimation={startAnimation} />
          </h2>
          <style.CategoriesGrid>
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <style.SkillCard key={category}>
                <h3>{category}</h3>
                {skills.map((skill) => (
                  <div key={skill.id} className="skill-row">
                    <div className="skill-name">{skill.name}</div>
                    <Progress
                      percent={skill.proficiency}
                      showInfo={false}
                      strokeColor={{
                        '0%': '#4a90e2',
                        '100%': '#00d2b2',
                      }}
                      trailColor="#5e6e7e"
                      style={{ marginTop: '8px' }}
                    />
                  </div>
                ))}
              </style.SkillCard>
            ))}
          </style.CategoriesGrid>
        </>
      )}
    </>
  );
};

export default Skills;
