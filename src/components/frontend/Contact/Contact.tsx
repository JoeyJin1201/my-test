import { Card, Typography } from 'antd';
import React, { useState } from 'react';

import KeyInText from '@/components/KeyInTextWithCursor/KeyInTextWithCursor';

interface ContactProps {
  startAnimation: boolean;
}

const Contact: React.FC<ContactProps> = ({ startAnimation }) => {
  const [email] = useState('example@example.com');
  const [phone] = useState('+123 456 7890');

  return (
    <>
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
    </>
  );
};

export default Contact;
