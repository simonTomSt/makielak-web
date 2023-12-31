'use client';
import { ChangeEvent, useState, useId } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

import { t } from '@/translations';
import { Spinner, Typography } from '@/components';
import { fileUrlLoader } from '@/utils';

type FileUploadProps = {
  label?: string;
  initialFileName?: string;
  onFileSelect: (file: File) => void;
};

export const FileUpload = ({
  label,
  initialFileName,
  onFileSelect,
}: FileUploadProps) => {
  const inputID = useId();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selected = fileList[0];

      setSelectedFile(selected);
      onFileSelect(selected);
    }
  };

  return (
    <div className='mt-4'>
      <Typography variant='h6'>{label}</Typography>
      <label
        htmlFor={inputID}
        className='relative inline-block bg-white border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer p-4 rounded transition-colors duration-300'
      >
        <Typography className='text-gray-600 flex'>
          <ArrowUpTrayIcon className='w-5 h-5 mr-2' />

          {t.upload_file.helper}
        </Typography>

        <input
          id={inputID}
          type='file'
          className='hidden'
          onChange={handleFileChange}
        />

        {selectedFile && (
          <p className='ml-4 text-gray-800'>
            {t.upload_file.selected_file} {selectedFile.name || initialFileName}
          </p>
        )}
      </label>

      {initialFileName && !selectedFile && (
        <Typography variant='h6' color='blue'>
          {t.upload_file.selected_file}{' '}
          <a
            href={fileUrlLoader(initialFileName)}
            target='_blank'
            rel='noopener noreferrer'
          >
            {initialFileName}
          </a>
        </Typography>
      )}
    </div>
  );
};
