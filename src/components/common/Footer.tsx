import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        <p>
          Built with <span className="text-red-500">♥</span> using Next.js and TailwindCSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
