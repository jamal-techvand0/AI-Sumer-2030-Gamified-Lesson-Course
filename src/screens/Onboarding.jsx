import { useState } from 'react';
import Mascot from '../components/Mascot';
import { animalOptions } from '../data/lessonData';
import './Onboarding.css';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [animal, setAnimal] = useState('');
  const [customAnimal, setCustomAnimal] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [transitioning, setTransitioning] = useState(false);

  const goNext = () => {
    setTransitioning(true);
    setTimeout(() => {
      setStep(s => s + 1);
      setTransitioning(false);
    }, 300);
  };

  const handleAnimalSelect = (opt) => {
    setAnimal(opt.name);
    setSelectedEmoji(opt.emoji);
    setCustomAnimal('');
  };

  const handleCustomAnimal = (value) => {
    setCustomAnimal(value);
    setAnimal(value);
    setSelectedEmoji('🐾');
  };

  const handleComplete = () => {
    onComplete({
      name,
      animal: animal || customAnimal,
      emoji: selectedEmoji || '🐾',
    });
  };

  return (
    <div className="onboarding">
      {/* Background decorations */}
      <div className="onboarding-bg">
        <div className="onboarding-circle circle-1" />
        <div className="onboarding-circle circle-2" />
        <div className="onboarding-circle circle-3" />
        <div className="onboarding-floating-emoji e1">🎵</div>
        <div className="onboarding-floating-emoji e2">🎨</div>
        <div className="onboarding-floating-emoji e3">✨</div>
        <div className="onboarding-floating-emoji e4">🚀</div>
        <div className="onboarding-floating-emoji e5">🌟</div>
      </div>

      {/* Progress dots */}
      <div className="onboarding-progress">
        {[0, 1, 2].map(i => (
          <div key={i} className={`progress-dot ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}`} />
        ))}
      </div>

      {/* Steps */}
      <div className={`onboarding-step-container ${transitioning ? 'exit' : 'enter'}`}>
        {step === 0 && (
          <div className="onboarding-step animate-fadeInUp">
            <Mascot
              message="Hey there! 👋 I'm Sparky, your AI adventure guide! What's your name?"
              size="lg"
              mood="waving"
            />
            <div className="onboarding-input-area">
              <h2 className="onboarding-question">What's your name?</h2>
              <input
                className="input input-lg onboarding-name-input"
                type="text"
                placeholder="Type your name here..."
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
                onKeyDown={e => e.key === 'Enter' && name.trim() && goNext()}
              />
              <button
                className="btn btn-primary btn-lg"
                disabled={!name.trim()}
                onClick={goNext}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="onboarding-step animate-fadeInUp">
            <Mascot
              message={`Awesome, ${name}! 🎉 Now pick your favorite animal — this buddy will be your creative companion for 20 days!`}
              size="lg"
              mood="excited"
            />
            <div className="onboarding-input-area">
              <h2 className="onboarding-question">Pick your favorite animal!</h2>
              <div className="animal-grid">
                {animalOptions.map(opt => (
                  <button
                    key={opt.name}
                    className={`animal-option ${animal === opt.name && !customAnimal ? 'selected' : ''}`}
                    onClick={() => handleAnimalSelect(opt)}
                  >
                    <span className="animal-option-emoji">{opt.emoji}</span>
                    <span className="animal-option-name">{opt.name}</span>
                  </button>
                ))}
              </div>
              <div className="animal-custom">
                <span className="animal-custom-label">Or type your own:</span>
                <input
                  className="input"
                  type="text"
                  placeholder="e.g., Axolotl, Red Panda..."
                  value={customAnimal}
                  onChange={e => handleCustomAnimal(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary btn-lg"
                disabled={!animal.trim()}
                onClick={goNext}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step animate-fadeInUp">
            <Mascot
              message={`${selectedEmoji} A ${animal}! AMAZING choice, ${name}! Get ready for 20 days of creating incredible things — songs, stories, art, videos, and SO much more — all starring YOUR ${animal}! Let's gooo! 🚀`}
              size="xl"
              mood="celebrating"
            />
            <div className="onboarding-input-area">
              <div className="onboarding-journey-preview">
                <h2 className="onboarding-question">Your 20-Day AI Adventure Awaits!</h2>
                <div className="journey-highlights">
                  <div className="journey-item animate-fadeInUp delay-1">
                    <span className="journey-icon">🎵</span>
                    <span>Create a theme song</span>
                  </div>
                  <div className="journey-item animate-fadeInUp delay-2">
                    <span className="journey-icon">📖</span>
                    <span>Write storybooks</span>
                  </div>
                  <div className="journey-item animate-fadeInUp delay-3">
                    <span className="journey-icon">📸</span>
                    <span>Generate impossible photos</span>
                  </div>
                  <div className="journey-item animate-fadeInUp delay-4">
                    <span className="journey-icon">🎬</span>
                    <span>Make animations & videos</span>
                  </div>
                  <div className="journey-item animate-fadeInUp delay-5">
                    <span className="journey-icon">🏆</span>
                    <span>Earn your certificate!</span>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary btn-lg start-button"
                onClick={handleComplete}
              >
                🚀 Start My Adventure!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
