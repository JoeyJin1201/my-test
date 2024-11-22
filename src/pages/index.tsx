import Experience from '@/components/frontend/Experience';
import Profile from '@/components/frontend/Profile';
import Projects from '@/components/frontend/Projects';
import Skills from '@/components/frontend/Skills';

const HomePage: React.FC = () => {
  return (
    <>
      <Profile />
      <Skills />
      <Experience />
      <Projects />
    </>
  );
};

export default HomePage;
