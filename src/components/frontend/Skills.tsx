import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCss3Alt, FaDatabase, FaDocker, FaGitAlt, FaJs, FaNodeJs, FaReact } from 'react-icons/fa';
import { RiNextjsFill } from "react-icons/ri";

// 定義技能類型
interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string; // 分類屬性
}

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  // 從後端 API 獲取技能數據
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get<Skill[]>('/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      }
    };

    fetchSkills();
  }, []);

  // 渲染技能的圖標
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaReact':
        return <FaReact />;
      case  'RiNextjsFill':
        return <RiNextjsFill />;
      case 'FaNodeJs':
        return <FaNodeJs />;
      case 'FaCss3Alt':
        return <FaCss3Alt />;
      case 'FaJs':
        return <FaJs />;
      case 'FaDatabase':
        return <FaDatabase />;
      case 'FaDocker':
        return <FaDocker />;
      case 'FaGitAlt':
        return <FaGitAlt />;
      default:
        return null;
    }
  };

  // 按分類分組技能
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <section className="py-16 px-8 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-12">Skills</h2>
      {Object.entries(groupedSkills).map(([category, skills]) => (
        <div className="flex flex-wrap justify-center gap-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {skills.map((skill, index) => (
              <div
                key={skill.id}
                className="flex flex-col items-center group hover:text-blue-500 transition-all"
              >
                <div className="text-6xl mb-4">{renderIcon(skill.icon)}</div>
                <p className="text-lg">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skills;
