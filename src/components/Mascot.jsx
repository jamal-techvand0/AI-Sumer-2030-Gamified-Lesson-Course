import { useState, useEffect } from 'react';
import './Mascot.css';

export default function Mascot({ message, size = 'md', animate = true, mood = 'happy' }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, [message]);

  const sizeMap = {
    sm: { body: 48, fontSize: '1.5rem' },
    md: { body: 72, fontSize: '2.5rem' },
    lg: { body: 96, fontSize: '3.5rem' },
    xl: { body: 120, fontSize: '4.5rem' },
  };

  const { body, fontSize } = sizeMap[size] || sizeMap.md;

  const moodEmoji = {
    happy: '🤖',
    excited: '🤩',
    thinking: '🧐',
    proud: '😊',
    celebrating: '🥳',
    waving: '👋',
  };

  return (
    <div className={`mascot-container ${isVisible ? 'visible' : ''}`}>
      <div className="mascot-character-row">
        <div
          className={`mascot-body ${animate ? 'animate-float' : ''}`}
          style={{ width: body, height: body, fontSize }}
        >
          <span className="mascot-face" role="img" aria-label="Sparky the mascot">
            {moodEmoji[mood] || moodEmoji.happy}
          </span>
          <div className="mascot-glow" />
        </div>
        {message && (
          <div className="mascot-speech-bubble animate-fadeInRight">
            <p>{message}</p>
            <span className="mascot-name">Sparky</span>
          </div>
        )}
      </div>
    </div>
  );
}
