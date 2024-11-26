import { Card, Typography } from 'antd';
import React, { useState } from 'react';

import * as style from './Contact.style';

const Contact: React.FC = () => {
  const [email, setEmail] = useState('example@example.com');
  const [phone, setPhone] = useState('+123 456 7890');

  return (
    <style.Container>
      <Typography.Title level={2}>Contact Me</Typography.Title>
      <Card>
        <Typography.Paragraph>
          <span>Email: </span>
          <span>{email}</span>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <span>Phone: </span>
          <span>{phone}</span>
        </Typography.Paragraph>
      </Card>
    </style.Container>
  );
};

export default Contact;
