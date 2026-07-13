import { useState, useEffect } from "react";
import { Sparkles, Brain, Rocket, Trophy, Waves } from "lucide-react";
import "./Mascot.css";

export default function Mascot({
  message,
  size = "md",
  animate = true,
  mood = "happy",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPoked, setIsPoked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, [message]);

  const sizeMap = {
    sm: { body: 48, fontSize: "1.5rem" },
    md: { body: 72, fontSize: "2.5rem" },
    lg: { body: 96, fontSize: "3.5rem" },
    xl: { body: 120, fontSize: "4.5rem" },
  };

  const { body, fontSize } = sizeMap[size] || sizeMap.md;

  const moodIcon = {
    happy: <Sparkles size={body * 0.42} />,
    excited: <Rocket size={body * 0.42} />,
    thinking: <Brain size={body * 0.42} />,
    proud: <Trophy size={body * 0.42} />,
    celebrating: <Waves size={body * 0.42} />,
    waving: <Sparkles size={body * 0.42} />,
  };

  const effectiveMood = isPoked ? "celebrating" : mood;

  const handleInteract = () => {
    setIsPoked(true);
    window.setTimeout(() => setIsPoked(false), 600);
  };

  return (
    <div className={`mascot-container ${isVisible ? "visible" : ""}`}>
      <div className="mascot-character-row">
        <div
          className={`mascot-body ${animate ? "mascot-idle" : ""} ${isPoked ? "mascot-poked" : ""}`}
          style={{ width: body, height: body, fontSize }}
          onClick={handleInteract}
          onMouseEnter={handleInteract}
        >
          <span
            className="mascot-face"
            role="img"
            aria-label="Sparky the mascot"
          >
            {moodIcon[effectiveMood] || moodIcon.happy}
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
