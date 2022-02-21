import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import { CustomButton } from '../../UI/CustomButton/CustomButton';

export function UserNotAuthorizedCard() {
  return (
    <Card sx={{ maxWidth: '50vw', margin: '4rem auto 3px auto' }}>
      <Box sx={{ margin: '2rem' }}>
        <Typography sx={{ fontWeight: '600' }} variant='h2'>
          Еще не зарегистрированы?
        </Typography>
        <Typography sx={{ fontWeight: '400', marginTop: '1.6rem', marginBottom: '1rem' }} variant='h4'>
          Для добавления фильмов в избранное
          и отслеживания подходящих вам подписок зарегистрируйтесь.
        </Typography>
        <Link to='/registration'>
          <Box sx={{ maxWidth: '20rem' }}>
            <CustomButton type='button' variant='text'>Зарегистрироваться</CustomButton>
          </Box>
        </Link>
      </Box>
      <Paper elevation={3} />
    </Card>
  );
}
