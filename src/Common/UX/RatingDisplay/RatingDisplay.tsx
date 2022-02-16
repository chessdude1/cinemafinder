import React from 'react';
import { Typography } from '@mui/material';
import './RatingDisplay.scss';

interface IRatingDisplay {
  evaluator: string;
  rating: number | string
}

export function RatingDisplay({ evaluator, rating } : IRatingDisplay) {
  return (
    <div className='rating-display'>
      <Typography sx={{ fontSize: '1.2rem' }}>{`${evaluator} : ${rating}`}</Typography>
    </div>
  );
}
