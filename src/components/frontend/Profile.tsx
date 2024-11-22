import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Parallax } from 'react-scroll-parallax';

interface Profile {
  name: string;
  title: string;
  email: string;
  description: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get<Profile>('/api/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16 px-8 text-center">
      <Parallax translateY={[-20, 20]} scale={[0.9, 1.1]}>
        <h1 className="text-4xl font-bold mb-4">{profile.name}</h1>
        <p className="text-lg">{profile.title}</p>
        <p className="mt-2 text-sm">{profile.email}</p>
        <p className="mt-4">{profile.description}</p>
      </Parallax>
    </section>
  );
};

export default Profile;
