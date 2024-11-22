import type { NextApiRequest, NextApiResponse } from 'next';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // 圖片 URL
}

let projects: Project[] = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing my skills and projects.',
    image: 'https://picsum.photos/400/300',
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    description: 'An e-commerce platform with full shopping cart functionality.',
    image: 'https://picsum.photos/400/300',
  },
  {
    id: 3,
    title: 'E-commerce Platform',
    description: 'An e-commerce platform with full shopping cart functionality.',
    image: 'https://picsum.photos/400/300',
  },
  {
    id: 4,
    title: 'E-commerce Platform',
    description: 'An e-commerce platform with full shopping cart functionality.',
    image: 'https://picsum.photos/400/300',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(projects);
  } else if (req.method === 'POST') {
    const { title, description, image } = req.body;
    const newProject: Project = {
      id: projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1,
      title,
      description,
      image,
    };
    projects.push(newProject);
    res.status(201).json(newProject);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    projects = projects.filter((project) => project.id !== id);
    res.status(200).json({ message: 'Project deleted successfully!' });
  } else if (req.method === 'PUT') {
    const { id, title, description, image } = req.body;
    projects = projects.map((project) =>
      project.id === id ? { id, title, description, image } : project
    );
    res.status(200).json({ message: 'Project updated successfully!' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
