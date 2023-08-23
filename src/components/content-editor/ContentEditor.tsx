'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { MDEditorProps } from '@uiw/react-md-editor';
import { Spinner } from '..';

type ContentEditorProps = MDEditorProps & {
  name: string;
  initialValue?: string;
};

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <Spinner className='h-8 w-8' />,
});

export const ContentEditor = ({
  name,
  initialValue = '',
  ...props
}: ContentEditorProps) => {
  const [value, setValue] = useState(() => initialValue);

  const handleChange = (value = '') => {
    setValue(value);
  };

  return (
    <>
      <input value={value || ''} type='hidden' name={name} />
      <MDEditor
        value={value || ''}
        height={500}
        onChange={handleChange}
        {...props}
      />
    </>
  );
};
