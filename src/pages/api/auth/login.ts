import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = 'your_secret_key';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password123') {
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
