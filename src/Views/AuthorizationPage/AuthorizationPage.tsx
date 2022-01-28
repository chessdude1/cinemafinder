import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { AuthPageActions } from '../../redux/AuthPageRedux/AuthPageActions';

interface ISignInFormType {
  email: string,
  password: string,
}

export function AuthorizationPage() {
  const dispatch = useDispatch();

  function handleSignInForm(values:ISignInFormType) {
    console.log('fuck');
    dispatch(AuthPageActions.SetUser({
      id: 7,
      subscribes: ['ivi'],
      favorite_films: ['192345'],
      ...values,
    }));
  }

  const authPage = useTypedSelector((store) => store.AuthPageReducer);

  const formik = useFormik({
    initialValues: {
      password: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: (values) => {
      handleSignInForm(values);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container maxWidth='md'>
      <h2>Sign in to your account</h2>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > :not(style)': { m: 1, width: '60%' },
        }}
        noValidate
        autoComplete='off'
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id='email'
          label='Email'
          variant='filled'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <TextField
          id='password'
          label='Password'
          variant='filled'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
      </Box>
    </Container>
  );
}
