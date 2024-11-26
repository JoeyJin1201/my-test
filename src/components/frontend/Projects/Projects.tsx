import { Card, Typography, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import * as style from './Projects.style';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Projects: React.FC = () => {
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
    <style.Container>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Typography.Title
            level={2}
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
            Our Projects
          </Typography.Title>
          {projects.map((project) => (
            <Card
              cover={<img alt={project.title} src={project.image} />}
              hoverable
            >
              <Card.Meta
                title={project.title}
                description={project.description}
              />
            </Card>
          ))}
        </>
      )}
    </style.Container>
  );
};

export default Projects;
