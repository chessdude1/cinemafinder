import React from 'react';
import './UploadButtonStyle.scss';
import uploadImg from '../../../Assets/img/uploadButton/upload.svg';

interface IUploadButton {
  name : string;
  handleChange : (e : any) => void;
}

export function UploadButton({ name, handleChange } : IUploadButton) {
  return (
    <div className='upload-button'>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
      <label htmlFor='upload-photo'>
        <img alt='upload' src={uploadImg} />
        Загрузить
      </label>
      <input onChange={((event) => { handleChange(event.currentTarget.files![0]); })} name={name} type='file' id='upload-photo' />
    </div>
  );
}
