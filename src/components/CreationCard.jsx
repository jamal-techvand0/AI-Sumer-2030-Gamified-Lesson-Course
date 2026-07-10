import './CreationCard.css';

export default function CreationCard({ creation, onClick, index = 0 }) {
  return (
    <div
      className="creation-card animate-fadeInUp"
      style={{ animationDelay: `${index * 0.08}s`, '--card-color': creation.color }}
      onClick={onClick}
    >
      <div className="creation-card-image" style={{ background: `linear-gradient(135deg, ${creation.color}33, ${creation.color}66)` }}>
        <span className="creation-card-emoji">{creation.emoji}</span>
        <span className="creation-card-day">Day {creation.day}</span>
      </div>
      <div className="creation-card-body">
        <h4 className="creation-card-title">{creation.title}</h4>
        <p className="creation-card-reflection">"{creation.reflection}"</p>
        <span className="badge badge-primary">Week {creation.week}</span>
      </div>
    </div>
  );
}
