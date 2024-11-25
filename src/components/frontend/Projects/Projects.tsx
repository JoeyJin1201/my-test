import { Card, Col, Row, Spin, Typography } from 'antd';
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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <style.SectionContainer id="projects">
      <Typography.Title
        level={2}
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        Our Projects
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {projects.map((project) => (
          <Col xs={24} sm={12} md={8} key={project.id}>
            <Card
              cover={<img alt={project.title} src={project.image} />}
              hoverable
            >
              <Card.Meta
                title={project.title}
                description={project.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </style.SectionContainer>
  );
};

export default Projects;
