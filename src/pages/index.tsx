import Experience from '@/components/frontend/Experience';
import Profile from '@/components/frontend/Profile';
import Projects from '@/components/frontend/Projects';
import Skills from '@/components/frontend/Skills';
import Contact from '@/components/frontend/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <Profile />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
};

export default HomePage;
