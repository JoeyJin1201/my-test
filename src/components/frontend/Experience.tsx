import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get<Experience[]>('/api/experience');
        setExperiences(response.data);
      } catch (error) {
        console.error('Failed to fetch experience data:', error);
      }
    };

    fetchExperience();
  }, []);

  return (
    <section className="py-16 px-8 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <h2 className="text-4xl font-bold text-center mb-12">Work Experience</h2>
      <div className="relative max-w-5xl mx-auto flex flex-col space-y-12">
        {/* 時間軸 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 to-purple-400 h-full hidden lg:block"></div>

        {/* 經驗項目 */}
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className={`relative flex flex-col items-center lg:items-start ${
              index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* 節點 */}
            <div className="absolute lg:left-1/2 transform lg:-translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full z-10 shadow-lg flex items-center justify-center text-white">
              {index + 1}
            </div>

            {/* 卡片 */}
            <div
              className={`w-full max-w-md bg-white shadow-lg p-6 rounded-lg border-t-4 ${
                index % 2 === 0 ? 'border-blue-500' : 'border-purple-500'
              } mt-12 lg:mt-0`}
            >
              <div className="flex items-center mb-4">
                <FaBriefcase className="text-blue-500 text-2xl mr-4" />
                <div>
                  <h3 className="text-xl font-bold">{exp.title}</h3>
                  <p className="text-sm text-gray-500">
                    {exp.company} | {exp.startDate} - {exp.endDate}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
