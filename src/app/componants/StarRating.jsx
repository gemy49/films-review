'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import styles from '../page.module.css';
export default function StarRating({ rating, max = 10 }) {
  const stars = [];
  const totalStars = 5;
  const valueOutOfFive = (rating / max) * totalStars;

  for (let i = 1; i <= totalStars; i++) {
    if (i <= Math.floor(valueOutOfFive)) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={fullStar}
          className={`text-warning me-1 ${styles.star_icon}`}
        />
      );
    } else if (i - valueOutOfFive < 1) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStarHalfAlt}
          className={`text-warning me-1 ${styles.star_icon}`}
        />
      );
    } else {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={emptyStar}
          className={`text-warning me-1 ${styles.star_icon}`}
        />
      );
    }
  }

  return (
    <div className="d-flex align-items-center" style={{ height: '10%' , width: '15%'}}>
      {stars}
    </div>
  );
}
