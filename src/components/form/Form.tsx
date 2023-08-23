import { ReactNode, FormEventHandler } from 'react';

interface FormProps<T> {
  children: ReactNode;
  onSubmit: (values: T) => void;
}

export const Form = <T,>({ children, onSubmit }: FormProps<T>) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const target = e.target;

    const values = Object.values(target).reduce((acc, input) => {
      if (input.value && input.name) {
        acc[input.name] = input.value;
      }
      return acc;
    }, {});

    onSubmit(values);
  };

  return <form onSubmit={handleSubmit}>{children}</form>;
};
