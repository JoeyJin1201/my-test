import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography, Spin } from 'antd';
import axios from 'axios';

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
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        My Skills
      </Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={skills}
        renderItem={(skill) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={skill.icon} />}
              title={skill.name}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Skills;
