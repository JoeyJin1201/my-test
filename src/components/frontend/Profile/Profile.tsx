import { Card, Spin, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import KeyInText from '@/components/KeyInText/KeyInText';
import * as style from './Profile.style';

interface Profile {
  name: string;
  title: string;
  email: string;
  description: string;
}

interface ProfileProps {
  startAnimation: boolean; // 控制动画的启动
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
    <style.Container>
      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <h2>
            <KeyInText text="About Me" startAnimation={startAnimation} />
          </h2>
          <Card>
            <Typography.Title level={4}>{profile?.name}</Typography.Title>
            <Typography.Text>{profile?.title}</Typography.Text>
            <p>{profile?.description}</p>
            <Typography.Text>Email: {profile?.email}</Typography.Text>
          </Card>
        </>
      )}
    </style.Container>
  );
};

export default Profile;
