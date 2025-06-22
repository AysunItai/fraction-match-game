import { useState, useEffect } from 'react';
import Card from './components/Card';
import { fractionCards } from './data/fractionPairs';
import type { FractionCard } from './data/fractionPairs';
import './App.css';

type Team = 'בנים' | 'בנות';

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [shuffled, setShuffled] = useState<FractionCard[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [team, setTeam] = useState<Team>('בנות');
  const [score, setScore] = useState({ בנות: 0, בנים: 0 });

  useEffect(() => {
    setShuffled(shuffle(fractionCards));
  }, []);

  const handleCardClick = (id: string) => {
    if (flipped.includes(id) || matched.includes(id) || flipped.length === 2) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      const first = shuffled.find(c => c.id === firstId)!;
      const second = shuffled.find(c => c.id === secondId)!;

      const isSpecial = first.type === 'challenge' || second.type === 'challenge' ||
                        first.type === 'visual' || second.type === 'visual';

      if (first.matchId === second.matchId && !isSpecial) {
        setTimeout(() => {
          setMatched(prev => [...prev, firstId, secondId]);
          setScore(prev => ({ ...prev, [team]: prev[team] + 1 }));
          setFlipped([]);
          setTeam(team === 'בנות' ? 'בנים' : 'בנות');
        }, 600);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setTeam(team === 'בנות' ? 'בנים' : 'בנות');
        }, 1000);
      }
    }
  };

  const flippedSpecialCard =
    flipped.length === 1
      ? shuffled.find(c => c.id === flipped[0] && (c.type === 'challenge' || c.type === 'visual'))
      : null;

  const handleManualPoint = () => {
    const specialId = flipped.find(id => {
      const card = shuffled.find(c => c.id === id);
      return card?.type === 'challenge' || card?.type === 'visual';
    });

    if (!specialId) return;

    setMatched(prev => [...prev, specialId]);
    setScore(prev => ({ ...prev, [team]: prev[team] + 1 }));
    setFlipped([]);
    setTeam(team === 'בנות' ? 'בנים' : 'בנות');
  };

  const isGameOver = matched.length === shuffled.length;

  return (
    <div style={{ padding: '1rem', margin: 'auto', maxWidth: '1000px' }}>
      <h1 style={{ textAlign: 'center' }}>🧮 משחק התאמת שברים: בנים נגד בנות</h1>
      <h1 style={{ textAlign: 'center' }}>פותח על ידי נעם איתי ואייסון איתי ללימוד שברים לכיתה ה‎2</h1>
      <p style={{ textAlign: 'center' }}>👉 תור של <strong>{team}</strong>!</p>
      <p style={{ textAlign: 'center' }}>בנות: {score.בנות} | בנים: {score.בנים}</p>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        {/* Side Panel */}
        {flippedSpecialCard && (
          <div style={{
            minWidth: '200px',
            padding: '1rem',
            backgroundColor: '#fff',
            border: '2px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            marginTop: '1rem'
          }}>
            <p style={{ marginBottom: '0.5rem' }}>האם <strong>{team}</strong> הסבירו נכון?</p>
            <button
              onClick={handleManualPoint}
              style={{
                marginBottom: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              ✅ תנו נקודה ל<strong>{team}</strong>
            </button>
            <button
              onClick={() => {
                setFlipped([]);
                setTeam(team === 'בנות' ? 'בנים' : 'בנות');
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '100%'
              }}
            >
              ❌ ללא נקודה
            </button>
          </div>
        )}

        {/* Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '1rem',
            flexGrow: 1
          }}
        >
          {shuffled.map(card => (
            <Card
              key={card.id}
              content={card.content}
              isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
              isMatched={matched.includes(card.id)}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      </div>

      {isGameOver && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            textAlign: 'center',
            width: '90%',
            maxWidth: '400px'
          }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉 המשחק נגמר! 🎉</h2>
            <p style={{ fontSize: '1.5rem', color: '#2e7d32' }}>
              המנצחים: <strong>
                {score.בנות > score.בנים
                  ? '👧 בנות'
                  : score.בנים > score.בנות
                  ? '👦 בנים'
                  : '🤝 תיקו!'}
              </strong>
            </p>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>תודה ששיחקתם!</p>
          </div>
        </div>
      )}
    </div>
  );
}
