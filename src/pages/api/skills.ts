import type { NextApiRequest, NextApiResponse } from 'next';

export interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
}

let skills: Skill[] = [
  { id: 1, name: 'React', icon: 'FaReact', category: 'Frontend' },
  { id: 2, name: 'Next.js', icon: 'RiNextjsFill', category: 'Frontend' },
  { id: 3, name: 'TypeScript', icon: 'FaJs', category: 'Frontend' },
  { id: 4, name: 'CSS', icon: 'FaCss3Alt', category: 'Frontend' },
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
