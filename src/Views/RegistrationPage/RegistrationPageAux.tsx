import React from 'react';
import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useTypedSelector } from '../../Hooks/useTypedSelector';

import { RegistrationPage } from './RegistrationPage';

interface ISugnUpFormType {
  name: string;
  email: string;
  password: string;
}

export function RegistrationPageAux() {
  const dispatch = useDispatch();

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
      // handleRegForm(values);
    },
  });

  return (
    <RegistrationPage />
  );
}
