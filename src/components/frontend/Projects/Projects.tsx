import { Card, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import KeyInText from '@/components/KeyInTextWithCursor/KeyInTextWithCursor';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ProjectsProps {
  startAnimation: boolean; // 是否启动动画
}

const Projects: React.FC<ProjectsProps> = ({ startAnimation }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>('/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <h2>
            <KeyInText text="My Projects" startAnimation={startAnimation} />
          </h2>
          <div
            style={{
              width: '100%',
              display: 'grid',
              gap: '20px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(256px, 1fr))',
            }}
          >
            {projects.map((project) => (
              <Card
                key={project.id}
                cover={<img alt={project.title} src={project.image} />}
                hoverable
              >
                <Card.Meta
                  title={project.title}
                  description={project.description}
                />
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Projects;
