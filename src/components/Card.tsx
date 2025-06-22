import React from 'react';
import '../App.css';

type CardProps = {
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
};

export default function Card({ content, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <div className="card-container" onClick={onClick}>
      <div className={`card-inner ${isFlipped || isMatched ? 'flipped' : ''}`}>
        {/* BACK side should be shown first by default */}
        <div className="card-face card-back">זיכרון יוסף ב׳</div>

        {/* FRONT side (actual content) is rotated and hidden by default */}
        <div className="card-face card-front">{content}</div>
      </div>
    </div>
  );
}

