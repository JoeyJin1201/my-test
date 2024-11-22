import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = 'your_secret_key';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.status(200).json({ valid: true, decoded });
  } catch (error) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
}
