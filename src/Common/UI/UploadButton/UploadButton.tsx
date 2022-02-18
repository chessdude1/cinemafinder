import React from 'react';
import './UploadButtonStyle.scss';
import uploadImg from '../../../Assets/img/uploadButton/upload.svg';

export function UploadButton() {
  return (
    <div className='upload-button'>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
      <label htmlFor='upload-photo'>
        <img alt='upload' src={uploadImg} />
        Загрузить
      </label>
      <input type='file' name='photo' id='upload-photo' />
    </div>
  );
}
