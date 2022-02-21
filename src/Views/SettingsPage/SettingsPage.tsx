/* eslint-disable no-underscore-dangle */
import React, { useState, SyntheticEvent } from 'react';
import { Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import { createStyles, makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import { AuthPageActions, UserType } from '../../redux/AuthPageRedux/AuthPageActions';
import { CustomButton } from '../../Common/UI/CustomButton/CustomButton';
import { UploadButton } from '../../Common/UI/UploadButton/UploadButton';
import { CustomChangeButton } from '../../Common/UI/CustomChangeButton/CustomChangeButton';
import { CustomTextField } from '../../Common/UI/CustomTextField/CustomTextField';
import { changePassword, changePicture, postUser } from '../../Services/Service';

import './SettingsPageStyle.scss';
import { Snackbars } from '../../Common/UX/SnackBar/SnackBar';

const useStyles = makeStyles(() => createStyles({

  textField: {
    '& > *': {
      width: '100%',
      marginTop: '2.5rem',
    },
  },
}));

interface ISettingsPage {
  user : UserType
}

interface ISettings {
  password: string;
}

export function SettingsPage({ user } : ISettingsPage) {
  const [handleFile, setFile] = useState<string | File>('');
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false);
  const [isSuccessSnackBarOpen, setSuccessSnackBarOpen] = React.useState(false);
  const [isErrorSnackBarOpen, setErrorSnackBarOpen] = React.useState(false);
  const [isNameFieldTouched, setIsNameFieldTouched] = React.useState(false);
  const [name, setName] = React.useState<string>(`${user.name}`);

  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const classes = useStyles();

  const dispatch = useDispatch();

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

  async function handleForm() {
    try {
      let id : string | undefined = '';
      if (user.id) {
        id = user.id;
      } else {
        id = user._id;
      }
      let userWithChangedFields = user;
      if (name !== '') {
        const res = await postUser({ ...user, name });
        userWithChangedFields = res.data;
      }
      if (handleFile !== '') {
        const res = await changePicture(id, handleFile);
        userWithChangedFields = res.data;
      }

      dispatch(AuthPageActions.SetUser(userWithChangedFields));
      handleSuccessSnackBar();
    } catch (e : any) {
      if (e) {
        setErrorMessage(e.response?.data?.message);
        handleErrorSnackBar();
        console.log(e.response?.data?.message);
      }
    }
  }

  async function handleSettingsForm(newUserData : ISettings) {
    try {
      let id : string | undefined = '';
      if (user.id) {
        id = user.id;
      } else {
        id = user._id;
      }
      const userWithChangedPassword = await changePassword(id, newUserData.password);
      dispatch(AuthPageActions.SetUser(userWithChangedPassword.data));
    } catch (e : any) {
      if (e) {
        setErrorMessage(e.response?.data?.message);
        handleErrorSnackBar();
        console.log(e.response?.data?.message);
      }
    }
  }

  const handleNameChange = (e : SyntheticEvent) => {
    if (e.target) {
      setName((e.target as HTMLButtonElement).value);
    }
    setIsNameFieldTouched(true);
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
          const isNameError = name === '' && isNameFieldTouched;
          return (
            <Form className='registration-page__wrapper'>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '8rem' }}>
                <Box>
                  <Typography sx={{ fontWeight: '600', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' }} variant='h2'>Аккаунт</Typography>
                  <Box sx={{ display: 'flex', marginBottom: '2.4rem', justifyContent: 'center' }}>
                    {user.picture ? <img className='settings__user-image' alt='user' src={`http://localhost:5000/${user.picture}`} />
                      : <Avatar sx={{ width: '23.8rem', height: '23.8rem', borderRadius: '18rem' }} alt='Remy Sharp' src='/static/images/avatar/2.jpg' />}
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <UploadButton text='Загрузить изображение' handleChange={setFile} name='file' />
                  </Box>
                </Box>
                <Grid sx={{ marginTop: '4.3rem', marginLeft: '7rem', alignItems: 'center', maxWidth: '40rem' }} container spacing={1}>
                  <Grid className={classes.textField} item xs={10} md={10} lg={10}>
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
                  </Grid>
                  <Grid className={classes.textField} item xs={10} md={10} lg={10}>
                    <CustomTextField
                      name='email'
                      id='email'
                      label='Почта'
                      value={user.email}
                      type='email'
                      helperText=''
                      error={false}
                    />
                  </Grid>
                  <Grid className={classes.textField} item xs={10} md={10} lg={10}>
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
                        <CustomTextField
                          name='password'
                          id='password'
                          label='Password'
                          value='**********'
                          type='password'
                          helperText=''
                          error={false}
                        />
                      )}
                    <CustomChangeButton onClick={() => setIsPasswordChanged(!isPasswordChanged)} type='button' variant='outlined'>
                      {isPasswordChanged ? 'Сохранить' : 'Изменить пароль'}
                    </CustomChangeButton>
                  </Grid>
                  <Grid item xs={10} md={10} lg={10} sx={{ display: 'flex', justifyContent: 'right' }}>
                    <Box sx={{ width: '20rem', marginTop: '5rem' }}>
                      <CustomButton
                        variant='text'
                        type='submit'
                        onClick={() => { handleForm(); }}
                        disabled={Boolean(isPasswordErrors || isNameError)}
                      >
                        Сохранить
                      </CustomButton>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
