import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import { createStyles, makeStyles } from '@mui/styles';

import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { AuthPageActions } from '../../redux/AuthPageRedux/AuthPageActions';
import { login } from '../../Services/Service';

import { CustomTextField } from '../../Common/UI/CustomTextField';
import { CustomButton } from '../../Common/UI/CustomButton/CustomButton';

const useStyles = makeStyles(() => createStyles({
  root: {
    maxWidth: '450px',
    display: 'block',
    margin: '0 auto',
  },
  textField: {
    '& > *': {
      width: '100%',
    },
  },
  submitButton: {
    marginTop: '2.4rem',
  },
  title: { textAlign: 'center' },
  successMessage: { color: 'green' },
  errorMessage: { color: 'red' },
}));

interface ISignInForm {
    password: string
    email: string
}

interface IFormStatus {
    message: string
    type: string
}

interface IFormStatusProps {
    [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: 'Signed up successfully.',
    type: 'success',
  },
  duplicate: {
    message: 'Email-id already exist. Please use different email-id.',
    type: 'error',
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'error',
  },
};

export function AuthorizationPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  });

  async function loginUser(user: ISignInForm) {
    try {
      const response = await login(user.email, user.password);
      dispatch(AuthPageActions.SetIsLogin(true));
      dispatch(AuthPageActions.SetUser(response.data.user));

      localStorage.setItem('token', response.data.accessToken);
    } catch (e: any) {
      dispatch(AuthPageActions.SetIsLogin(false));
      console.log(e.response?.data?.message);
    }
  }

  const formStatusContent = () => {
    if (formStatus.type === 'error') {
      return (
        <p className={classes.errorMessage}>
          {formStatus.message}
        </p>
      );
    } if (formStatus.type === 'success') {
      return (
        <p className={classes.successMessage}>
          {formStatus.message}
        </p>
      );
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        onSubmit={(values: ISignInForm, actions) => {
          loginUser(values);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Enter valid email-id'),
          password: Yup.string()
            .matches(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
            )
            .required(
              'Please valid password. One uppercase, one lowercase, one special character and no spaces, more then 8 letters',
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
            isSubmitting,
          } = props;
          return (
            <Form>
              <h1 className={classes.title}>Sign in</h1>
              <Grid
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
                    name='password'
                    id='password'
                    label='Password'
                    value={values.password}
                    type='password'
                    helperText={
                      errors.password && touched.password
                        ? 'Please valid password. One uppercase, one lowercase, one special character and no spaces'
                        : 'One uppercase, one lowercase, one special character and no spaces'
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
                  className={classes.textField}
                >
                  <CustomTextField
                    name='email'
                    id='email'
                    label='Email-id'
                    value={values.email}
                    type='email'
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : 'Enter email-id'
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
                  className={classes.submitButton}
                >
                  <CustomButton
                    type='submit'
                    color='secondary'
                    disabled={isSubmitting}
                  >
                    Sign in
                  </CustomButton>
                  {displayFormStatus && (
                    <div className='formStatus'>
                      {formStatusContent}
                    </div>
                  )}
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
