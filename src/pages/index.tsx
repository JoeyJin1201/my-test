import Contact from '@/components/frontend/Contact';
import Experience from '@/components/frontend/Experience/Experience';
import Profile from '@/components/frontend/Profile/Profile';
import Projects from '@/components/frontend/Projects/Projects';
import Skills from '@/components/frontend/Skills/Skills';

const HomePage: React.FC = (props) => {
  console.log(props);

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
