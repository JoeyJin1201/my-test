import type { NextApiRequest, NextApiResponse } from 'next';

export interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
}

let skills: Skill[] = [
  // Frontend Skills
  { id: 1, name: 'React', icon: 'FaReact', category: 'Frontend' },
  { id: 2, name: 'Next.js', icon: 'RiNextjsFill', category: 'Frontend' },
  { id: 3, name: 'TypeScript', icon: 'FaJs', category: 'Frontend' },
  { id: 4, name: 'CSS', icon: 'FaCss3Alt', category: 'Frontend' },
  { id: 5, name: 'Vue.js', icon: 'FaVuejs', category: 'Frontend' },
  { id: 6, name: 'Angular', icon: 'FaAngular', category: 'Frontend' },
  { id: 7, name: 'HTML', icon: 'FaHtml5', category: 'Frontend' },
  { id: 8, name: 'JavaScript', icon: 'FaJsSquare', category: 'Frontend' },

  // Backend Skills
  { id: 9, name: 'Node.js', icon: 'FaNode', category: 'Backend' },
  { id: 10, name: 'Express.js', icon: 'FaServer', category: 'Backend' },
  { id: 11, name: 'Java', icon: 'FaJava', category: 'Backend' },
  { id: 12, name: 'Spring Boot', icon: 'SiSpring', category: 'Backend' },
  { id: 13, name: 'Python', icon: 'FaPython', category: 'Backend' },
  { id: 14, name: 'Django', icon: 'SiDjango', category: 'Backend' },
  { id: 15, name: 'Ruby on Rails', icon: 'FaGem', category: 'Backend' },
  { id: 16, name: 'PHP', icon: 'FaPhp', category: 'Backend' },

  // DevOps Skills
  { id: 17, name: 'Docker', icon: 'FaDocker', category: 'DevOps' },
  { id: 18, name: 'Kubernetes', icon: 'SiKubernetes', category: 'DevOps' },
  { id: 19, name: 'AWS', icon: 'FaAws', category: 'DevOps' },
  { id: 20, name: 'Azure', icon: 'FaMicrosoft', category: 'DevOps' },
  { id: 21, name: 'Jenkins', icon: 'FaJenkins', category: 'DevOps' },
  { id: 22, name: 'GitLab CI/CD', icon: 'FaGitlab', category: 'DevOps' },
  { id: 23, name: 'Terraform', icon: 'SiTerraform', category: 'DevOps' },
  { id: 24, name: 'Ansible', icon: 'FaAnsible', category: 'DevOps' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(skills);
  } else if (req.method === 'POST') {
    const { name, icon, category } = req.body;
    const newSkill: Skill = {
      id: skills.length ? Math.max(...skills.map((s) => s.id)) + 1 : 1,
      name,
      icon,
      category,
    };
    skills.push(newSkill);
    res.status(201).json(newSkill);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    skills = skills.filter((skill) => skill.id !== id);
    res.status(200).json({ message: 'Skill deleted' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
