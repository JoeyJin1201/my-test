import React from 'react';
import { Card, Typography } from 'antd';

const Contact: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Typography.Title level={2}>Contact Me</Typography.Title>
      <Card>
        <Typography.Paragraph>Email: example@example.com</Typography.Paragraph>
        <Typography.Paragraph>Phone: +123 456 7890</Typography.Paragraph>
      </Card>
    </div>
  );
};

export default Contact;
