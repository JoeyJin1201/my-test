import type { NextApiRequest, NextApiResponse } from 'next';

import { skills } from './index';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Invalid skill id' });
  }

  const parsedId = parseInt(id, 10);
  const skillIndex = skills.findIndex((skill) => skill.id === parsedId);

  if (skillIndex === -1) {
    return res.status(404).json({ message: 'Skill not found' });
  }

  if (req.method === 'DELETE') {
    skills.splice(skillIndex, 1);
    res.status(200).json({ message: 'Skill deleted successfully' });
  } else if (req.method === 'PUT') {
    const { name, category, proficiency } = req.body;

    if (!name || !category || proficiency === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (proficiency < 0 || proficiency > 100) {
      return res
        .status(400)
        .json({ message: 'Proficiency must be between 0 and 100' });
    }

    skills[skillIndex] = {
      id: parsedId,
      name,
      category,
      proficiency,
    };

    res.status(200).json(skills[skillIndex]);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
