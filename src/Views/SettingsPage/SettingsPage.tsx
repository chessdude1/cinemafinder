import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import { UserType } from '../../redux/AuthPageRedux/AuthPageActions';
import { API_URL } from '../../Services/Interceptors';
import { CustomButton } from '../../Common/UI/CustomButton/CustomButton';
import { UploadButton } from '../../Common/UI/UploadButton/UploadButton';
import { CustomChangeButton } from '../../Common/UI/CustomChangeButton/CustomChangeButton';
import { CustomTextField } from '../../Common/UI/CustomTextField/CustomTextField';
import { postUser } from '../../Services/Service';
import { IUser } from '../../Services/ServiceTypes';

import './SettingsPageStyle.scss';
import { Snackbars } from '../../Common/UX/SnackBar/SnackBar';

interface ISettingsPage {
  user : UserType
}

const LeftColumnItems = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'left',
}));

const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
}));

interface ISettings {
  password: string;
}

export function SettingsPage({ user } : ISettingsPage) {
  const [handleFile, setFile] = useState<string | File>('');
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);
  const [isNameChanged, setIsNameChanged] = useState<boolean>(false);
  const [isSuccessSnackBarOpen, setSuccessSnackBarOpen] = React.useState(false);
  const [isErrorSnackBarOpen, setErrorSnackBarOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const isNameError = name === '';

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

  async function handleSettingsForm(newUserData : ISettings) {
    try {
      console.log(123);
      let userAfterChangeData : IUser = user;
      if (name !== '') {
        userAfterChangeData = {
          ...user,
          name,
        };
      }
      const test = await postUser(
        userAfterChangeData,
      );
      console.log(test);
    } catch (e : any) {
      if (e) {
        console.log(e.response?.data?.message);
      }
    }
  }

  const handleNameChange = (e : any) => {
    setName(e.target.value);
  };

  return (
    <div>
      <Snackbars
        handleClose={handleCloseSnackBar}
        text='Успешно сохранено'
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
          password: '',
        }}
        onSubmit={(values: ISettings) => {
          handleSettingsForm(values);
        }}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .matches(
              / ((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
            )
            .required(
              'Please valid password. One uppercase, one lowercase, one special character, at least 8 symbols and no spaces',
            ),

        })}
      >
        {(props: FormikProps<ISettings>) => {
          const {
            values,
            touched,
            errors,
            handleBlur,
            handleChange,
          } = props;
          const isPasswordErrors = touched.password && errors.password;

          return (
            <Form className='registration-page__wrapper'>
              <div className='settings'>
                <Box sx={{ margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography sx={{ fontWeight: '600', marginTop: '4.7rem', marginBottom: '4.7rem', display: 'flex', justifyContent: 'center' }} variant='h2'>Избранное</Typography>
                  <Box sx={{ display: 'flex', marginBottom: '2.4rem', justifyContent: 'center' }}>
                    {user.picture ? <img className='settings__user-image' alt='user' src={`${API_URL}/${user.picture}`} />
                      : <Avatar sx={{ width: '23.8rem', height: '23.8rem', borderRadius: '18rem' }} alt='Remy Sharp' src='/static/images/avatar/2.jpg' />}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <UploadButton text='Загрузить изображение' handleChange={setFile} name='file' />
                  </Box>
                  <Grid sx={{ marginTop: '4.3rem', alignItems: 'center' }} container spacing={3}>
                    <Grid item xs={6} md={4}>
                      <LeftColumnItems>
                        <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.2rem' }} variant='h5'>
                          Имя пользователя:
                        </Typography>
                      </LeftColumnItems>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Item>
                        { isNameChanged ? (
                          <CustomTextField
                            name='Name'
                            id='Name'
                            label='name'
                            value={name}
                            type='text'
                            error={isNameError}
                            helperText='Enter your name'
                            onChange={handleNameChange}
                            onBlur={handleBlur}
                          />
                        ) : (
                          <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.2rem' }} variant='h5'>
                            {user.name}
                          </Typography>
                        )}

                      </Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Item>
                        <Item>
                          <CustomChangeButton onClick={() => setIsNameChanged(!isNameChanged)} type='button' variant='outlined'>Изменить</CustomChangeButton>
                        </Item>
                      </Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <LeftColumnItems>
                        <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.2rem' }} variant='h5'>
                          Почта:
                        </Typography>
                      </LeftColumnItems>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Item>
                        <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.2rem' }} variant='h5'>
                          {user.email}
                        </Typography>
                      </Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Item>
                        <Typography sx={{ color: 'white', marginTop: '0.2rem', marginBottom: '0.2rem' }} variant='h5'>
                          0
                        </Typography>
                      </Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <LeftColumnItems>
                        <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.2rem' }} variant='h5'>
                          Пароль:
                        </Typography>
                      </LeftColumnItems>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Item>
                        {isPasswordChanged ? (
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
                        )
                          : (
                            <Typography sx={{ marginTop: '0.2rem', marginBottom: '0.2rem' }} variant='h5'>
                              •••••••••••
                            </Typography>
                          )}

                      </Item>
                    </Grid>
                    <Grid item xs={6} md={4}>
                      <Item>
                        <CustomChangeButton onClick={() => setIsPasswordChanged(!isPasswordChanged)} type='button' variant='outlined'>
                          {isPasswordChanged ? 'Сохранить' : 'Изменить'}
                        </CustomChangeButton>
                      </Item>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <Box sx={{ display: 'flex',
                marginTop: '3rem',
                justifyContent: 'center' }}
              >
                <CustomButton
                  variant='text'
                  type='submit'
                  disabled={Boolean(isPasswordErrors || isNameError)}
                >
                  Сохранить
                </CustomButton>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
