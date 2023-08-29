'use client';
import { ChangeEvent, useState, useId } from 'react';
import Image from 'next/image';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';

import { t } from '@/translations';
import { Spinner, Typography } from '@/components';
import { RowType } from '@/api';
import { storeImage } from '@/api/spa';
import supabaseLoader from '../../imageLoader';

type ImageUploadProps = {
  label?: string;
  initialImage?: string;
  loading?: boolean;
  onFileSelect: (image: RowType<'images'>, file: File) => void;
};

export const ImageUpload = ({
  label,
  initialImage,
  loading,
  onFileSelect,
}: ImageUploadProps) => {
  const inputID = useId();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(
    () => initialImage || null
  );

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selected = fileList[0];
      setSelectedFile(selected);

      const image = await storeImage(selected, previewURL || initialImage);

      if (image) {
        onFileSelect(image, selected);
      }

      setPreviewURL(image?.url || null);
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
            {t.upload_file.selected_file} {selectedFile.name}
          </p>
        )}

        {previewURL &&
          (loading ? (
            <Spinner />
          ) : (
            <Image
              width={400}
              height={400}
              src={previewURL}
              alt='File preview'
              className='mt-4 max-w-full h-40 object-contain rounded'
              loader={supabaseLoader}
            />
          ))}
      </label>
    </div>
  );
};
