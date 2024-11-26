import { Card, Typography } from 'antd';
import React, { useState } from 'react';

import KeyInText from '@/components/KeyInTextWithCursor/KeyInTextWithCursor';
import * as style from './Contact.style';

interface ContactProps {
  startAnimation: boolean; // 动画触发状态
}

const Contact: React.FC<ContactProps> = ({ startAnimation }) => {
  const [email] = useState('example@example.com');
  const [phone] = useState('+123 456 7890');

  return (
    <style.Container>
      <h2>
        <KeyInText text="Keep In Touch" startAnimation={startAnimation} />
      </h2>
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
