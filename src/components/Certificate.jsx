import { Sparkles, Trophy, Star } from "lucide-react";
import "./Certificate.css";

export default function Certificate({ studentName, animalName, animalEmoji }) {
  return (
    <div className="certificate animate-scaleIn">
      <div className="certificate-border">
        <div className="certificate-inner">
          <div className="certificate-ribbon">
            <Trophy size={40} />
          </div>
          <div className="certificate-stars">
            <span>
              <Star size={18} />
            </span>
            <span>
              <Star size={18} />
            </span>
            <span>
              <Star size={18} />
            </span>
          </div>
          <h2 className="certificate-title">Certificate of Completion</h2>
          <div className="certificate-divider" />
          <p className="certificate-subtitle">This certifies that</p>
          <h1 className="certificate-name">
            {studentName || "Amazing Student"}
          </h1>
          <p className="certificate-text">has successfully completed the</p>
          <h3 className="certificate-program">
            <span className="certificate-emoji">
              <Sparkles size={16} />
            </span>
            20-Day AI Creative Journey
            <span className="certificate-emoji">
              <Sparkles size={16} />
            </span>
          </h3>
          <p className="certificate-text">
            Creating amazing AI-powered stories, songs, artwork, and more
            <br />
            featuring their incredible {animalName || "animal"} character!
          </p>
          <div className="certificate-stats">
            <div className="certificate-stat">
              <span className="certificate-stat-number">20</span>
              <span className="certificate-stat-label">Days</span>
            </div>
            <div className="certificate-stat">
              <span className="certificate-stat-number">15+</span>
              <span className="certificate-stat-label">Creations</span>
            </div>
            <div className="certificate-stat">
              <span className="certificate-stat-number">10</span>
              <span className="certificate-stat-label">AI Tools</span>
            </div>
          </div>
          <div className="certificate-badge">
            <span>AI Creator — Summer 2030</span>
          </div>
          <div className="certificate-footer">
            <p>
              Congratulations, {studentName || "Champion"}! You're an AI
              Creative Master!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
