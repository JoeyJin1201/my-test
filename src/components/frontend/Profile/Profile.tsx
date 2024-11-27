import { Skeleton, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import KeyInText from '@/components/KeyInTextWithCursor/KeyInTextWithCursor';

import * as style from './Profile.style';

interface Profile {
  name: string;
  title: string;
  email: string;
  description: string[];
}

interface ProfileProps {
  startAnimation: boolean;
}

const Profile: React.FC<ProfileProps> = ({ startAnimation }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get<Profile>('/api/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <h2>
            <KeyInText text="About Me" startAnimation={startAnimation} />
          </h2>
          <style.ProfileCard>
            <style.Avatar>
              <span>{profile?.name.charAt(0)}</span>
            </style.Avatar>
            <style.Content>
              <Typography.Title level={3}>{profile?.name}</Typography.Title>
              <Typography.Text className="title">
                {profile?.title}
              </Typography.Text>
              <ul>
                {profile?.description?.map((item: string, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </style.Content>
          </style.ProfileCard>
        </>
      )}
    </>
  );
};

export default Profile;
