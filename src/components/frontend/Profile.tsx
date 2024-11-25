import React, { useEffect, useState } from 'react';
import { Card, Typography, Spin } from 'antd';
import axios from 'axios';

interface Profile {
  name: string;
  title: string;
  email: string;
  description: string;
}

const Profile: React.FC = () => {
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

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        About Me
      </Typography.Title>
      <Card>
        <Typography.Title level={4}>{profile.name}</Typography.Title>
        <Typography.Text>{profile.title}</Typography.Text>
        <p>{profile.description}</p>
        <Typography.Text>Email: {profile.email}</Typography.Text>
      </Card>
    </div>
  );
};

export default Profile;
