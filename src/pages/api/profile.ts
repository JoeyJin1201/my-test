import type { NextApiRequest, NextApiResponse } from 'next';

interface Profile {
  name: string;
  title: string;
  email: string;
  description: string;
}

let profile: Profile = {
  name: 'John Doe',
  title: 'Frontend Engineer',
  email: 'john.doe@example.com',
  description: 'Passionate about creating interactive and dynamic web applications.',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(profile);
  } else if (req.method === 'POST') {
    const { name, title, email, description } = req.body;
    profile = { name, title, email, description };
    res.status(200).json({ message: 'Profile updated successfully!', profile });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
