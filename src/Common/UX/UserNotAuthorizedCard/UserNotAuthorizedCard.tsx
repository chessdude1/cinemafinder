import React from 'react';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import { CustomButton } from '../../UI/CustomButton/CustomButton';

export function UserNotAuthorizedCard() {
  return (
    <Card sx={{ maxWidth: '60vw', margin: '4rem auto 3px auto' }}>
      <Typography sx={{ fontWeight: '600' }} variant='h2'>
        Еще не зарегистрированы?
      </Typography>
      <Typography sx={{ fontWeight: '400', marginTop: '16px' }} variant='h4'>
        Для добавления фильмов в избранное и отслеживания подходящих вам подписок зарегистрируйтесь.
      </Typography>
      <CustomButton type='button' variant='text'>Зарегистрироваться</CustomButton>
      <Paper elevation={3} />
    </Card>
  );
}
