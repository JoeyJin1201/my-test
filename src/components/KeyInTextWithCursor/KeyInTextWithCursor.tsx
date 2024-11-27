import { Source_Code_Pro } from 'next/font/google';
import React, { useEffect, useState } from 'react';

import * as style from './KeyInTextWithCursor.style';

interface KeyInTextWithCursorProps {
  text: string;
  speed?: number;
  startAnimation: boolean;
  className?: string;
}

const sourceCodePro = Source_Code_Pro({
  display: 'swap',
  subsets: ['latin'],
});

const KeyInTextWithCursor: React.FC<KeyInTextWithCursorProps> = ({
  text,
  speed = 100,
  startAnimation,
  className,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let typingTimeout: NodeJS.Timeout | null = null;
    if (startAnimation && index < text.length) {
      typingTimeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
    }

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [index, text, speed, startAnimation]);

  return (
    <style.KeyInText className={`${className} key-in-text ${sourceCodePro.className}`}>
      {displayText}
      <span className="cursor" />
    </style.KeyInText>
  );
};

export default KeyInTextWithCursor;
