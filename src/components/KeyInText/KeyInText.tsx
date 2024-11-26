import React, { useState, useEffect } from 'react';

import * as style from './KeyInTextWithCursor.style'; // 引入样式文件

interface KeyInTextWithCursorProps {
  text: string; // 要显示的文字
  speed?: number; // 每个字符的动画速度（毫秒）
  startAnimation: boolean; // 动画是否启动
  className?: string; // 自定义类名
}

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
    <style.KeyInText className={`${className} key-in-text`}>
      {displayText}
      <span className="cursor" />
    </style.KeyInText>
  );
};

export default KeyInTextWithCursor;
