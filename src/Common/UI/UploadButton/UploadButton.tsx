import React from 'react';
import './UploadButtonStyle.scss';
import { Typography } from '@mui/material';
import uploadImg from '../../../Assets/img/uploadButton/upload.svg';

interface IUploadButton {
  name : string;
  handleChange : (e : any) => void;
  text: string;
  file ?: string | undefined
}

export function UploadButton({ name, handleChange, text, file } : IUploadButton) {
  return (
    <div className='upload-button'>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
      <label htmlFor='upload-photo'>
        <div className='upload-img-wrapper'>
          <img alt='upload' src={uploadImg} />
        </div>
        {text}
      </label>
      <input onChange={((event) => { handleChange(event.currentTarget.files![0]); })} name={name} type='file' id='upload-photo' />
      {file ? (
        <Typography variant='subtitle1'>
          {file}
        </Typography>
      ) : ''}
    </div>
  );
}
