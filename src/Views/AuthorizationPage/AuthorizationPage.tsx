import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import { createStyles, makeStyles } from '@mui/styles';

import Box from '@mui/material/Box';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import { AuthPageActions } from '../../redux/AuthPageRedux/AuthPageActions';
import { login } from '../../Services/Service';

import { CustomTextField } from '../../Common/UI/CustomTextField/CustomTextField';
import { CustomButton } from '../../Common/UI/CustomButton/CustomButton';
import { Snackbars } from '../../Common/UX/SnackBar/SnackBar';
import { TIMEBEFOREREDIRECT } from '../RegistrationPage/RegistrationPage';

const useStyles = makeStyles(() => createStyles({
  root: {
    maxWidth: '405px',
    display: 'block',
    margin: '0 auto',
  },
  textField: {
    '& > *': {
      width: '100%',
    },
  },
  submitButton: {
    marginTop: '2rem',
  },
}));

interface ISignInForm {
    password: string
    email: string
}

export function AuthorizationPage() {
  const [isSuccessSnackBarOpen, setSuccessSnackBarOpen] = React.useState(false);
  const [isErrorSnackBarOpen, setErrorSnackBarOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const navigate = useNavigate();

  const handleSuccessSnackBar = () => {
    setSuccessSnackBarOpen(true);
  };

  const handleErrorSnackBar = () => {
    setErrorSnackBarOpen(true);
  };

  const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccessSnackBarOpen(false);
    setErrorSnackBarOpen(false);
  };
  const dispatch = useDispatch();
  const classes = useStyles();

  async function loginUser(user: ISignInForm) {
    try {
      const response = await login(user.email, user.password);
      dispatch(AuthPageActions.SetIsLogin(true));
      handleSuccessSnackBar();
      localStorage.setItem('token', response.data.accessToken);
      dispatch(AuthPageActions.SetUser(response.data.user));
      setTimeout(() => navigate('/'), TIMEBEFOREREDIRECT);
    } catch (e: any) {
      setErrorMessage(e.response?.data?.message);
      handleErrorSnackBar();
      dispatch(AuthPageActions.SetIsLogin(false));
      console.log(e.response?.data?.message);
    }
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values: ISignInForm) => {
          loginUser(values);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Введите валидную почту'),
          password: Yup.string()
            .matches(
              / ((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
            )
            .required(
              'Введите валидный пароль, состоящий из одного символа в нижнем регистре, одного в верхнем и одного специального символа. Длина пароля не менее 8 символов.',
            ),
        })}
      >
        {(props: FormikProps<ISignInForm>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
          } = props;
          const isErrors = Object.entries(errors).length !== 0;

          return (
            <Form>
              <Snackbars
                handleClose={handleCloseSnackBar}
                text='Успешный вход'
                type='success'
                isOpen={isSuccessSnackBarOpen}
              />
              <Snackbars
                handleClose={handleCloseSnackBar}
                text={`${errorMessage} `}
                type='error'
                isOpen={isErrorSnackBarOpen}
              />
              <Typography
                sx={{ fontWeight: '600',
                  display: 'flex',
                  justifyContent: 'start',
                  marginTop: '18rem',
                  marginBottom: '2.4rem' }}
                variant='h2'
              >
                Логин
              </Typography>
              <Grid
                sx={{ marginTop: '2.4rem' }}
                container
                spacing={2}
                direction='row'
              >
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
                    label='Почта'
                    value={values.email}
                    type='email'
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : 'Введите почту'
                    }
                    error={
                      !!(errors.email && touched.email)
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
                    name='password'
                    id='password'
                    label='Пароль'
                    value={values.password}
                    type='password'
                    helperText={
                      errors.password && touched.password
                        ? 'Введите валидный пароль, состоящий из одного символа в нижнем регистре, одного в верхнем и одного специального символа. Длина пароля не менее 8 символов.'
                        : 'Пароль должен состоять из одного символа в нижнем регистре, одного в верхнем и одного специального символа. Длина пароля не менее 8 символов.'
                    }
                    error={
                      !!(errors.password && touched.password)
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
                  className={classes.submitButton}
                >
                  <Box sx={{ display: 'flex',
                    justifyContent: 'center' }}
                  >
                    <CustomButton
                      type='submit'
                      color='secondary'
                      disabled={isErrors}
                    >
                      Войти
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
