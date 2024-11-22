import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-gray-800 text-white z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link href="/" className="text-xl font-bold hover:text-gray-400">
          My Portfolio
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#profile" className="hover:text-gray-400">
                About Me
              </Link>
            </li>
            <li>
              <Link href="#skills" className="hover:text-gray-400">
                Skills
              </Link>
            </li>
            <li>
              <Link href="#projects" className="hover:text-gray-400">
                Projects
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
