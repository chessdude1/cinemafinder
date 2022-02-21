import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

import { createStyles, makeStyles } from '@mui/styles';

import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import { registrationUserFormData } from '../../Services/Service';

import { CustomTextField } from '../../Common/UI/CustomTextField/CustomTextField';
import { AuthPageActions } from '../../redux/AuthPageRedux/AuthPageActions';
import { CustomButton } from '../../Common/UI/CustomButton/CustomButton';
import { UploadButton } from '../../Common/UI/UploadButton/UploadButton';
import { Snackbars } from '../../Common/UX/SnackBar/SnackBar';

export const TIMEBEFOREREDIRECT = 2500;

const useStyles = makeStyles(() => createStyles({
  root: {
    maxWidth: '35rem',
    display: 'block',
    margin: '0 auto',
  },
  textField: {
    '& > *': {
      marginTop: '2.2rem',
      width: '100%',
    },
  },
  submitButton: {
    marginTop: '2.4rem',
  },
}));

 interface ISignUpForm {
  Name: string;
  password: string;
  confirmPassword: string;
  email: string;
  file : string;
}

export function RegistrationPage() {
  const [isSuccessSnackBarOpen, setSuccessSnackBarOpen] = React.useState(false);
  const [isErrorSnackBarOpen, setErrorSnackBarOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const navigate = useNavigate();

  let userEmail = '';

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

  const classes = useStyles();

  const dispatch = useDispatch();
  const [handleFile, setFile] = useState<string | File>('');

  async function createUser(user : ISignUpForm) {
    try {
      const response = await registrationUserFormData(user.email, user.password, user.Name, handleFile);
      userEmail = response.data.user.email;
      handleSuccessSnackBar();
      dispatch(AuthPageActions.SetIsLogin(true));
      dispatch(AuthPageActions.SetUser(response.data.user));
      localStorage.setItem('token', response.data.accessToken);
      setTimeout(() => navigate('/'), TIMEBEFOREREDIRECT);
    } catch (e : any) {
      if (e) {
        dispatch(AuthPageActions.SetIsLogin(false));
        setErrorMessage(e.response?.data?.message);
        handleErrorSnackBar();
        console.log(e.response?.data?.message);
      }
    }
  }

  return (
    <div className={classes.root}>
      <Snackbars
        handleClose={handleCloseSnackBar}
        text={`На почту ${userEmail} отправлена ссылка для активации аккаунта, не забудьте проверить папку спам.`}
        type='success'
        isOpen={isSuccessSnackBarOpen}
      />
      <Snackbars
        handleClose={handleCloseSnackBar}
        text={`${errorMessage} `}
        type='error'
        isOpen={isErrorSnackBarOpen}
      />

      <Formik
        initialValues={{
          Name: '',
          password: '',
          confirmPassword: '',
          email: '',
          file: '',
        }}
        onSubmit={(values: ISignUpForm) => {
          createUser(values);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Введите валидную почту'),
          Name: Yup.string().required('Введите имя'),
          password: Yup.string()
            .matches(
              / ((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
            )
            .required(
              'Введите валидный пароль, состоящий из одного символа в нижнем регистре, одного в верхнем и одного специального символа. Длина пароля не менее 8 символов.',
            ),
          confirmPassword: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
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
              </Typography>

              <Grid container spacing={1} direction='row'>
                <Grid
                  sx={{ margin: '0 auto' }}
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
                    label='Имя'
                    value={values.Name}
                    type='text'
                    helperText={
                      errors.Name && touched.Name
                        ? errors.Name
                        : 'Введите имя пользователя'
                    }
                    error={!!(errors.Name && touched.Name)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  sx={{ margin: '0 auto' }}
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
                    error={!!(errors.password && touched.password)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  sx={{ margin: '0 auto' }}
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
                    label='Подтверждение пароля'
                    value={values.confirmPassword}
                    type='password'
                    helperText={
                      errors.confirmPassword && touched.confirmPassword
                        ? errors.confirmPassword
                        : 'Повторите пароль для подтверждения'
                    }
                    error={
                      !!(errors.confirmPassword && touched.confirmPassword)
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  sx={{ margin: '0 auto' }}
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
                    error={!!(errors.email && touched.email)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid
                  sx={{ margin: '0 auto' }}
                  item
                  lg={10}
                  md={10}
                  sm={10}
                  xs={10}
                  className={classes.submitButton}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '3.2rem', marginBottom: '4.8rem' }}>
                    <UploadButton file={handleFile ? (handleFile as File).name : ''} text='Загрузить изображение' handleChange={setFile} name='file' />
                  </Box>
                  <CustomButton
                    variant='text'
                    type='submit'
                    disabled={isErrors}
                  >
                    Зарегистрироваться
                  </CustomButton>

                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
