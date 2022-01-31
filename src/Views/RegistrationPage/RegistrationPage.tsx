import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { createStyles, makeStyles } from '@mui/styles';

import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';

import { CustomTextField } from '../../Common/UI/CustomTextField';
import { useTypedSelector } from '../../Hooks/useTypedSelector';
import { AuthPageActions } from '../../redux/AuthPageRedux/AuthPageActions';
import { CustomButton } from '../../Common/UI/CustomButton';

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

interface ISignUpForm {
  fullName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface IFormStatus {
  message: string;
  type: string;
}

interface IFormStatusProps {
  [key: string]: IFormStatus;
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

export function RegistrationPage() {
  const classes = useStyles();
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  });

  const dispatch = useDispatch();

  function createNewUser(
    data: ISignUpForm,
    resetForm: (emptyForm: Record<string, never>) => void,
  ) {
    dispatch(
      AuthPageActions.SetUser({
        id: 7,
        subscribes: ['ivi'],
        favorite_films: ['192345'],
        ...data,
      }),
    );
  }

  const authPage = useTypedSelector((store) => store.AuthPageReducer);

  const formStatusContent = () => {
    if (formStatus.type === 'error') {
      return <p className={classes.errorMessage}>{formStatus.message}</p>;
    }
    if (formStatus.type === 'success') {
      return <p className={classes.successMessage}>{formStatus.message}</p>;
    }
    return null;
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          fullName: '',
          password: '',
          confirmPassword: '',
          email: '',
        }}
        onSubmit={(values: ISignUpForm, actions) => {
          createNewUser(values, actions.resetForm);
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 500);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Enter valid email-id'),
          fullName: Yup.string().required('Please enter full name'),
          password: Yup.string()
            .matches(
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/,
            )
            .required(
              'Please valid password. One uppercase, one lowercase, one special character and no spaces',
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
            isSubmitting,
          } = props;
          return (
            <Form>
              <h1 className={classes.title}>Sign up</h1>
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
                    name='fullName'
                    id='fullName'
                    label='Full Name'
                    value={values.fullName}
                    type='text'
                    helperText={
                      errors.fullName && touched.fullName
                        ? errors.fullName
                        : 'Enter your full name.'
                    }
                    error={!!(errors.fullName && touched.fullName)}
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
                        ? 'Please valid password. One uppercase, one lowercase, one special character and no spaces'
                        : 'One uppercase, one lowercase, one special character and no spaces'
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
                    label='Email-id'
                    value={values.email}
                    type='email'
                    helperText={
                      errors.email && touched.email
                        ? errors.email
                        : 'Enter email-id'
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
                  <CustomButton
                    type='submit'
                    variant='contained'
                    color='secondary'
                    disabled={isSubmitting}
                  >
                    Submit
                  </CustomButton>
                  {displayFormStatus && (
                    <div className='formStatus'>{formStatusContent}</div>
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
