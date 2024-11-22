import React, { useState } from 'react';
import AdminSkills from '@/components/backend/AdminSkills';
import AdminProfile from '@/components/backend/AdminProfile';
import AdminProjects from '@/components/backend/AdminProjects';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'profile' | 'projects'>(
    'skills',
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'skills':
        return <AdminSkills />;
      case 'profile':
        return <AdminProfile />;
      case 'projects':
        return <AdminProjects />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* 標籤導航 */}
      <div className="flex space-x-4 mb-6 border-b pb-2">
        {['skills', 'profile', 'projects'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`relative px-4 py-2 font-medium text-gray-700 ${
              activeTab === tab ? 'text-blue-500' : 'hover:text-gray-500'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* 動態內容過渡 */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
