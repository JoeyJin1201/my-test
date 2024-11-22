import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Skill {
  id: number;
  name: string;
  icon: string;
  category: string;
}

const AdminSkills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState<Partial<Skill>>({
    name: '',
    icon: '',
    category: '',
  });

  // 獲取技能列表
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get<Skill[]>('/api/skills');
        setSkills(response.data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      }
    };

    fetchSkills();
  }, []);

  // 添加新技能
  const addSkill = async () => {
    if (!newSkill.name || !newSkill.icon || !newSkill.category) {
      alert('Please fill out all fields');
      return;
    }
    try {
      const response = await axios.post('/api/skills', newSkill);
      setSkills((prevSkills) => [...prevSkills, response.data]);
      setNewSkill({ name: '', icon: '', category: '' });
    } catch (error) {
      console.error('Failed to add skill:', error);
    }
  };

  // 刪除技能
  const deleteSkill = async (id: number) => {
    try {
      await axios.delete('/api/skills', { data: { id } });
      setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
    } catch (error) {
      console.error('Failed to delete skill:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Skills</h1>

      {/* 新技能表單 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Skill</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Skill Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Icon Name (e.g., FaReact)"
            value={newSkill.icon}
            onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newSkill.category}
            onChange={(e) =>
              setNewSkill({ ...newSkill, category: e.target.value })
            }
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Skill
        </button>
      </div>

      {/* 技能列表 */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Current Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-bold">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.category}</p>
              </div>
              <button
                onClick={() => deleteSkill(skill.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSkills;
