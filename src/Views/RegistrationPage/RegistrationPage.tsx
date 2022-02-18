import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import { createStyles, makeStyles } from '@mui/styles';

import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import { registration } from '../../Services/Service';

import { CustomTextField } from '../../Common/UI/CustomTextField/CustomTextField';
import { AuthPageActions } from '../../redux/AuthPageRedux/AuthPageActions';
import { CustomButton } from '../../Common/UI/CustomButton/CustomButton';
import { UploadButton } from '../../Common/UI/UploadButton/UploadButton';

const useStyles = makeStyles(() => createStyles({
  root: {
    maxWidth: '35rem',
    display: 'block',
    margin: '0 auto',
  },
  textField: {
    '& > *': {
      marginTop: '3.2rem',
      width: '130%',
    },
  },
  submitButton: {
    marginTop: '2.4rem',
  },
  title: { textAlign: 'center' },
  successMessage: { color: 'green' },
  errorMessage: { color: 'red' },
}));

interface ISignUpForm {
  Name: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export function RegistrationPage() {
  const classes = useStyles();

  const dispatch = useDispatch();

  async function createUser(user : ISignUpForm) {
    try {
      const response = await registration(user.email, user.password);
      dispatch(AuthPageActions.SetIsLogin(true));
      dispatch(AuthPageActions.SetUser(response.data.user));
      localStorage.setItem('token', response.data.accessToken);
    } catch (e : any) {
      if (e) {
        dispatch(AuthPageActions.SetIsLogin(false));
        console.log(e.response?.data?.message);
      }
    }
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          Name: '',
          password: '',
          confirmPassword: '',
          email: '',
        }}
        onSubmit={(values: ISignUpForm) => {
          createUser(values);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Enter valid email'),
          Name: Yup.string().required('Please enter full name'),
          password: Yup.string()
            .matches(
              / ((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
            )
            .required(
              'Please valid password. One uppercase, one lowercase, one special character, at least 8 symbols and no spaces',
            ),
          confirmPassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        })}
      >
        {(props: FormikProps<ISignUpForm>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
          } = props;

          const isErrors = Object.entries(errors).length !== 0;

          return (
            <Form className='registration-page__wrapper'>
              <Typography
                sx={{ fontWeight: '600',
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '4.8rem',
                  marginBottom: '2.4rem' }}
                variant='h2'
              >
                Создать аккаунт
                {' '}

              </Typography>

              <Grid container spacing={2} direction='row'>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <CustomTextField
                    name='Name'
                    id='Name'
                    label='Name'
                    value={values.Name}
                    type='text'
                    helperText={
                      errors.Name && touched.Name
                        ? errors.Name
                        : 'Enter your name.'
                    }
                    error={!!(errors.Name && touched.Name)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <CustomTextField
                    name='password'
                    id='password'
                    label='Password'
                    value={values.password}
                    type='password'
                    helperText={
                      errors.password && touched.password
                        ? 'Please valid password. One uppercase, one lowercase, one special character at least 8 symbols and no spaces'
                        : 'One uppercase, one lowercase, one special character at least 8 symbols and no spaces'
                    }
                    error={!!(errors.password && touched.password)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <CustomTextField
                    name='confirmPassword'
                    id='confirmPassword'
                    label='Confirm password'
                    value={values.confirmPassword}
                    type='password'
                    helperText={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : 'Re-enter password to confirm'
                    }
                    error={
                      !!(errors.confirmPassword && touched.confirmPassword)
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.textField}
                >
                  <CustomTextField
                    name='email'
                    id='email'
                    label='Email'
                    value={values.email}
                    type='email'
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : 'Enter email'
                    }
                    error={!!(errors.email && touched.email)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.submitButton}
                >
                  <Box sx={{ display: 'flex',
                    width: '130%',
                    marginBottom: '4.8rem',
                    justifyContent: 'center' }}
                  >
                    <UploadButton />
                  </Box>

                  <Box sx={{ display: 'flex',
                    width: '130%',
                    justifyContent: 'center' }}
                  >
                    <CustomButton
                      variant='contained'
                      type='submit'
                      disabled={isErrors}
                    >
                      Регистрация
                    </CustomButton>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
