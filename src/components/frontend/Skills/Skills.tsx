import { Badge, Progress, Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import KeyInText from '@/components/KeyInTextWithCursor/KeyInTextWithCursor';
import { colors } from '@/utils/colors';
import * as style from './Skills.style';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

interface SkillsProps {
  startAnimation: boolean;
}

const Skills: React.FC<SkillsProps> = ({ startAnimation }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [animatedProficiencies, setAnimatedProficiencies] = useState<
    Record<number, number>
  >({}); // 用於記錄每個進度條的動畫進度

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get<Skill[]>('/api/skills');
        const skillsWithProficiency = response.data.map((skill) => ({
          ...skill,
          proficiency: Math.min(Math.max(skill.proficiency, 0), 100), // 確保百分比在 0-100 範圍內
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

  useEffect(() => {
    if (!loading) {
      // 啟動進度條的填充動畫
      const interval = setInterval(() => {
        setAnimatedProficiencies((prev) => {
          const updated = { ...prev };
          let allFilled = true;
          skills.forEach((skill) => {
            if (!updated[skill.id] || updated[skill.id] < skill.proficiency) {
              updated[skill.id] = Math.min(
                (updated[skill.id] || 0) + 2, // 每次增加 1%
                skill.proficiency
              );
              allFilled = false;
            }
          });
          if (allFilled) {
            clearInterval(interval); // 所有進度條填充完成時停止動畫
          }
          return updated;
        });
      }, 100); // 動畫每 100ms 更新一次
    }
  }, [loading, skills]);

  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <h2>
            <KeyInText text="My Skills" startAnimation={startAnimation} />
          </h2>
          <style.CategoriesGrid>
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <style.SkillCardWrapper key={category}>
                <Badge.Ribbon text={category} color={colors.accent400}>
                  <style.SkillCard>
                    {skills.map((skill) => (
                      <div key={skill.id} className="skill-row">
                        <div className="skill-name">{skill.name}</div>
                        <Progress
                          percent={animatedProficiencies[skill.id] || 0} // 動態填充
                          showInfo={false}
                          strokeColor={{
                            '0%': colors.accent400,
                            '100%': colors.accent300,
                          }}
                          trailColor={colors.accent100}
                          style={{ marginTop: '8px' }}
                        />
                      </div>
                    ))}
                  </style.SkillCard>
                </Badge.Ribbon>
              </style.SkillCardWrapper>
            ))}
          </style.CategoriesGrid>
        </>
      )}
    </>
  );
};

export default Skills;
