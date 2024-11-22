import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>('/api/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const addProject = async () => {
    if (!newProject.title || !newProject.description || !newProject.image) {
      alert('Please fill out all fields');
      return;
    }
    try {
      const response = await axios.post('/api/projects', newProject);
      setProjects((prev) => [...prev, response.data]);
      setNewProject({ title: '', description: '', image: '' });
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await axios.delete('/api/projects', { data: { id } });
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>

      {/* 新增項目表單 */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title || ''}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="p-2 border rounded"
          />
          <textarea
            placeholder="Project Description"
            value={newProject.description || ''}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newProject.image || ''}
            onChange={(e) =>
              setNewProject({ ...newProject, image: e.target.value })
            }
            className="p-2 border rounded"
          />
        </div>
        <button
          onClick={addProject}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Project
        </button>
      </div>

      {/* 項目列表 */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Current Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 border rounded flex flex-col justify-between items-center"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <div className="text-center">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <button
                onClick={() => deleteProject(project.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
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

export default AdminProjects;
