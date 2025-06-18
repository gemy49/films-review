import React from 'react'
import styles from '../page.module.css';

export default function RatingCircle({ rating }) {
  const percentage = Math.round(rating * 10); 
  const radius = 22;
  const stroke = 4;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const color = getRatingColor(rating);

  return (
    <div className={`${styles.translateMiddle}`}>

        
    <div style={{ position: 'relative', width: '50px', height: '50px', }}>
      <svg height="50" width="50">
        <circle
          stroke="#ddd"
          fill="black"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="25"
          cy="25"
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx="25"
          cy="25"
          style={{ transition: 'stroke-dashoffset 0.5s',
            
           }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '12px',
          fontWeight: 'bold',
          color: "white",
          
        }}
      >
        {percentage}%
      </div>
    </div>
    </div>
  );
}

function getRatingColor(rating) {
  const percent = rating * 10;
  if (percent >= 75) return '#28a745'; 
  if (percent >= 50) return '#ffc107'; 
  return '#dc3545'; 
}
