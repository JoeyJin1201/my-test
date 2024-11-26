import type { NextApiRequest, NextApiResponse } from 'next';

interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    startDate: '2020-01',
    endDate: '2022-12',
    description: 'Developed dynamic web applications using React and TypeScript.',
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    startDate: '2018-03',
    endDate: '2019-12',
    description: 'Designed intuitive user interfaces and optimized user experiences.',
  },
  {
    id: 3,
    title: 'Intern',
    company: 'Startup Inc.',
    startDate: '2017-06',
    endDate: '2017-12',
    description: 'Assisted in the development of mobile-friendly websites.',
  },
  {
    id: 4,
    title: 'Software Engineer',
    company: 'Global Solutions Ltd.',
    startDate: '2016-01',
    endDate: '2017-05',
    description: 'Implemented back-end services and RESTful APIs using Node.js and MongoDB.',
  },
  {
    id: 5,
    title: 'Project Manager',
    company: 'Innovatech',
    startDate: '2014-08',
    endDate: '2015-12',
    description: 'Led a team of 10 developers to successfully launch a SaaS platform.',
  },
  {
    id: 6,
    title: 'Graphic Designer',
    company: 'Pixel Perfection',
    startDate: '2012-05',
    endDate: '2014-07',
    description: 'Created branding materials and digital assets for clients across various industries.',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(experiences);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
