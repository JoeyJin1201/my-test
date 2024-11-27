import type { NextApiRequest, NextApiResponse } from 'next';

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

let skills: Skill[] = [
  // Frontend Skills
  { id: 1, name: 'React', category: 'Frontend', proficiency: 90 },
  { id: 2, name: 'Next.js', category: 'Frontend', proficiency: 85 },
  { id: 3, name: 'TypeScript', category: 'Frontend', proficiency: 80 },
  { id: 4, name: 'CSS', category: 'Frontend', proficiency: 75 },
  { id: 5, name: 'Vue.js', category: 'Frontend', proficiency: 70 },
  { id: 7, name: 'HTML', category: 'Frontend', proficiency: 95 },
  { id: 8, name: 'JavaScript', category: 'Frontend', proficiency: 85 },

  // Backend Skills
  { id: 9, name: 'Node.js', category: 'Backend', proficiency: 80 },
  { id: 10, name: 'Express.js', category: 'Backend', proficiency: 75 },

  // DevOps Skills
  { id: 17, name: 'Docker', category: 'DevOps', proficiency: 85 },
  { id: 18, name: 'Kubernetes', category: 'DevOps', proficiency: 80 },
  { id: 19, name: 'AWS', category: 'DevOps', proficiency: 90 },
  { id: 20, name: 'Azure', category: 'DevOps', proficiency: 70 },
  { id: 22, name: 'GitLab CI/CD', category: 'DevOps', proficiency: 80 },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(skills);
  } else if (req.method === 'POST') {
    const { name, category, proficiency } = req.body;

    if (!name || !category || proficiency === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (proficiency < 0 || proficiency > 100) {
      return res
        .status(400)
        .json({ message: 'Proficiency must be between 0 and 100' });
    }

    const newSkill: Skill = {
      id: skills.length ? Math.max(...skills.map((s) => s.id)) + 1 : 1,
      name,
      category,
      proficiency,
    };

    skills.push(newSkill);
    res.status(201).json(newSkill);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

export { skills };
