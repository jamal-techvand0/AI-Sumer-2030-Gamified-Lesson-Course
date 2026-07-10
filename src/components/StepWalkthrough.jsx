import './StepWalkthrough.css';

export default function StepWalkthrough({ steps, color }) {
  return (
    <div className="steps-container">
      {steps.map((step, i) => (
        <div
          key={i}
          className="step-card animate-fadeInLeft"
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          <div className="step-number" style={{ background: color || 'var(--color-primary)' }}>
            {i + 1}
          </div>
          <div className="step-content">
            <h4 className="step-title">{step.title}</h4>
            <p className="step-description">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
