import type { NextApiRequest, NextApiResponse } from 'next';

import { experiences } from './index';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: 'Invalid experience id' });
  }

  const parsedId = parseInt(id, 10);
  const experienceIndex = experiences.findIndex((exp) => exp.id === parsedId);

  if (experienceIndex === -1) {
    return res.status(404).json({ message: 'Experience not found' });
  }

  if (req.method === 'DELETE') {
    experiences.splice(experienceIndex, 1);
    res.status(200).json({ message: 'Experience deleted successfully' });
  } else if (req.method === 'PUT') {
    const { title, company, startDate, endDate, description } = req.body;

    if (!title || !company || !startDate || !endDate || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    experiences[experienceIndex] = {
      id: parsedId,
      title,
      company,
      startDate,
      endDate,
      description,
    };

    res.status(200).json(experiences[experienceIndex]);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
