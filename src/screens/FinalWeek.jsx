import { useState } from 'react';
import Mascot from '../components/Mascot';
import './FinalWeek.css';

// Day 17 — Storyboard Planner
export function Day17Storyboard({ studentName, animalName, animalEmoji, onComplete, onBack }) {
  const [scenes, setScenes] = useState([
    { description: `${animalEmoji} Opening shot: ${animalName} waking up in their habitat, stretching, theme song starts playing`, duration: '0:00 - 0:20' },
    { description: `${animalEmoji} ${animalName} discovers something magical — a glowing portal appears! Quick cuts of impossible photos`, duration: '0:20 - 0:50' },
    { description: `${animalEmoji} Adventure montage: ${animalName} visits different worlds, meets other characters, showcases all creations`, duration: '0:50 - 1:40' },
  ]);

  const addScene = () => {
    setScenes([...scenes, { description: '', duration: '' }]);
  };

  const updateScene = (index, field, value) => {
    const updated = [...scenes];
    updated[index][field] = value;
    setScenes(updated);
  };

  const removeScene = (index) => {
    setScenes(scenes.filter((_, i) => i !== index));
  };

  return (
    <div className="final-week screen">
      <div className="container container-narrow">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to Map</button>

        <div className="fw-header animate-fadeInDown">
          <div className="fw-day-badge" style={{ background: '#A8D8EA' }}>Day 17</div>
          <h1 className="fw-title">🎞️ Storyboard & Scene Plan</h1>
        </div>

        <Mascot message="Great filmmakers always storyboard first! Plan out every scene of your masterpiece! 🎬" mood="excited" />

        <div className="fw-content">
          <h2 className="fw-section-title">Your Scenes</h2>
          <div className="scene-list">
            {scenes.map((scene, i) => (
              <div key={i} className="scene-card animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="scene-number">Scene {i + 1}</div>
                <div className="scene-fields">
                  <div className="scene-field">
                    <label className="scene-label">What happens?</label>
                    <textarea
                      className="textarea"
                      value={scene.description}
                      onChange={e => updateScene(i, 'description', e.target.value)}
                      rows={2}
                      placeholder="Describe what the viewer sees, hears, and feels..."
                    />
                  </div>
                  <div className="scene-field">
                    <label className="scene-label">Timing</label>
                    <input
                      className="input"
                      value={scene.duration}
                      onChange={e => updateScene(i, 'duration', e.target.value)}
                      placeholder="e.g., 0:00 - 0:20"
                    />
                  </div>
                </div>
                {scenes.length > 1 && (
                  <button className="scene-remove" onClick={() => removeScene(i)}>✕</button>
                )}
              </div>
            ))}
          </div>
          <button className="btn btn-secondary add-scene-btn" onClick={addScene}>
            ＋ Add Scene
          </button>

          <div className="fw-complete-area">
            <button className="btn btn-primary btn-lg" onClick={() => onComplete(17)}>
              ✅ Mark Day 17 Complete!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Day 18 — Mixing Checklist
export function Day18Mixing({ studentName, animalName, animalEmoji, onComplete, onBack }) {
  const [checklist, setChecklist] = useState([
    { label: 'Theme Song', emoji: '🎵', description: `Your ${animalName}'s original theme song from Day 1`, checked: false },
    { label: 'Character Images', emoji: '📸', description: 'Impossible photos, ID card, and AR scenes', checked: false },
    { label: 'Voice Recording', emoji: '🎙️', description: `${animalName}'s voiceover and documentary narration`, checked: false },
    { label: 'Animations & GIFs', emoji: '✨', description: 'Walking loops, animated scenes, and transitions', checked: false },
  ]);

  const toggleItem = (index) => {
    const updated = [...checklist];
    updated[index].checked = !updated[index].checked;
    setChecklist(updated);
  };

  const allChecked = checklist.every(item => item.checked);

  return (
    <div className="final-week screen">
      <div className="container container-narrow">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to Map</button>

        <div className="fw-header animate-fadeInDown">
          <div className="fw-day-badge" style={{ background: '#FFDAB9' }}>Day 18</div>
          <h1 className="fw-title">📦 Mix & Assemble</h1>
        </div>

        <Mascot message="Time to gather everything you've created and get it ready for the big finale! Let's check our inventory! 📋" mood="excited" />

        <div className="fw-content">
          <h2 className="fw-section-title">Asset Checklist</h2>
          <p className="fw-description">Check off each asset as you confirm it's ready for your final video:</p>

          <div className="checklist">
            {checklist.map((item, i) => (
              <div
                key={i}
                className={`checkbox-wrapper ${item.checked ? 'checked' : ''} animate-fadeInUp`}
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => toggleItem(i)}
              >
                <div className={`checkbox ${item.checked ? 'checked' : ''}`}>
                  {item.checked && '✓'}
                </div>
                <div className="checklist-content">
                  <div className="checklist-header">
                    <span className="checklist-emoji">{item.emoji}</span>
                    <span className={`checklist-label ${item.checked ? 'checked-text' : ''}`}>{item.label}</span>
                  </div>
                  <p className="checklist-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {allChecked && (
            <div className="all-checked-message animate-popIn">
              <span>🎉</span> All assets ready! You're good to go!
            </div>
          )}

          <div className="fw-complete-area">
            <button className="btn btn-primary btn-lg" onClick={() => onComplete(18)}>
              ✅ Mark Day 18 Complete!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Day 19 — Improvements
export function Day19Improve({ studentName, animalName, animalEmoji, onComplete, onBack }) {
  const [improvement, setImprovement] = useState('');

  return (
    <div className="final-week screen">
      <div className="container container-narrow">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to Map</button>

        <div className="fw-header animate-fadeInDown">
          <div className="fw-day-badge" style={{ background: '#C1E1C1' }}>Day 19</div>
          <h1 className="fw-title">✨ Polish & Improve</h1>
        </div>

        <Mascot message="Almost there! Today is about making good things GREAT. Even tiny improvements can transform your project! 💎" mood="thinking" />

        <div className="fw-content">
          <h2 className="fw-section-title">One Thing to Improve</h2>
          <p className="fw-description">
            Look at your project with fresh eyes. What's the ONE change that would make the biggest difference?
          </p>

          <div className="improve-card">
            <div className="improve-icon">💡</div>
            <textarea
              className="textarea improve-input"
              placeholder={`What's one thing you'd improve about your ${animalName} project? Maybe a smoother transition, a better image, a funnier line...`}
              value={improvement}
              onChange={e => setImprovement(e.target.value)}
              rows={5}
            />
            {improvement && (
              <div className="improve-feedback animate-fadeIn">
                <p>✨ Great insight! Small changes lead to big improvements.</p>
              </div>
            )}
          </div>

          <div className="fw-complete-area">
            <button className="btn btn-primary btn-lg" onClick={() => onComplete(19)}>
              ✅ Mark Day 19 Complete!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Day 20 — Final Showcase
import Certificate from '../components/Certificate';
import { mockCreations } from '../data/lessonData';

export function Day20Showcase({ studentName, animalName, animalEmoji, onComplete, onBack }) {
  const [showCertificate, setShowCertificate] = useState(false);

  return (
    <div className="final-week screen">
      <div className="container">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>← Back to Map</button>

        <div className="fw-header animate-fadeInDown" style={{ textAlign: 'center' }}>
          <h1 className="fw-title showcase-title">🏆 Final Showcase — Day 20! 🎉</h1>
          <p className="fw-subtitle">Everything you've created in 20 amazing days</p>
        </div>

        <Mascot
          message={`🎉 YOU DID IT, ${studentName}! 20 DAYS OF AMAZING CREATIVITY! I'm SO proud of you and your incredible ${animalName}! Let's celebrate! 🎊`}
          mood="celebrating"
          size="lg"
        />

        {/* All creations grid */}
        <div className="showcase-section">
          <h2 className="fw-section-title">Your Complete Collection</h2>
          <div className="showcase-grid">
            {mockCreations.map((creation, i) => (
              <div
                key={creation.day}
                className="showcase-item animate-fadeInUp"
                style={{ animationDelay: `${i * 0.05}s`, '--card-color': creation.color }}
              >
                <div className="showcase-item-icon" style={{ background: `linear-gradient(135deg, ${creation.color}55, ${creation.color}99)` }}>
                  <span>{creation.emoji}</span>
                </div>
                <div className="showcase-item-info">
                  <span className="showcase-item-day">Day {creation.day}</span>
                  <span className="showcase-item-title">{creation.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificate toggle */}
        <div className="showcase-certificate-area">
          {!showCertificate ? (
            <button
              className="btn btn-accent btn-lg certificate-btn"
              onClick={() => setShowCertificate(true)}
            >
              🏆 Reveal Your Certificate!
            </button>
          ) : (
            <Certificate
              studentName={studentName}
              animalName={animalName}
              animalEmoji={animalEmoji}
            />
          )}
        </div>

        <div className="fw-complete-area">
          <button className="btn btn-primary btn-lg" onClick={() => onComplete(20)}>
            🎉 Complete the Journey!
          </button>
        </div>
      </div>
    </div>
  );
}
