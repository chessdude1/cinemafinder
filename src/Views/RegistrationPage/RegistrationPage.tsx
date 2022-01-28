import React from 'react';
import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { AuthPageActions } from '../../redux/AuthPageRedux/AuthPageActions';

interface ISugnUpFormType {
  name: string,
  email: string,
  password: string,
}

export function RegistrationPage() {
  const dispatch = useDispatch();

  function handleRegForm(values:ISugnUpFormType) {
    console.log('fuck');
    dispatch(AuthPageActions.SetUser({
      id: 5,
      subscribes: ['ivi'],
      favorite_films: ['192345'],
      ...values,
    }));
  }

  const authPage = useTypedSelector((store) => store.AuthPageReducer);
  // console.log(authPage);

  const formik = useFormik({
    initialValues: {
      name: '',
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
      handleRegForm(values);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container maxWidth='md'>
      <h2>Create free account</h2>
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
          id='name'
          label='Name'
          type='text'
          variant='filled'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        <TextField
          id='email'
          label='Email'
          type='email'
          variant='filled'
          onChange={formik.handleChange}
          onFocus={() => console.log('hui')}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <TextField
          id='password'
          label='Password'
          type='password'
          variant='filled'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <Button type='submit' variant='contained'>Sign Up</Button>
      </Box>
    </Container>
  );
}
