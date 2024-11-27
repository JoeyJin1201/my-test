import type { NextApiRequest, NextApiResponse } from 'next';

interface Profile {
  name: string;
  title: string;
  description: string[];
}

let profile: Profile = {
  name: 'John Doe',
  title: 'Frontend Engineer',
  description: [
    '5+ years in web development',
    'Expert in React and TypeScript',
    'Focused on user-friendly designs',
    'Passionate about accessible web design',
    'Team player with problem-solving skills',
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(profile);
  } else if (req.method === 'POST') {
    const { name, title, description } = req.body;
    profile = { name, title, description };
    res.status(200).json({ message: 'Profile updated successfully!', profile });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
