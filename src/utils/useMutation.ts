'use client';
import { useState, useCallback } from 'react';

type LoadingState = boolean;
type ErrorState = Error | null;
type DataState<T> = T | null;

type UseMutationOptions = {
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
};

export const useMutation = <T>({
  onSuccess,
  onError,
}: UseMutationOptions = {}) => {
  const [loading, setLoading] = useState<LoadingState>(false);
  const [error, setError] = useState<ErrorState>(null);
  const [data, setData] = useState<DataState<T>>(null);

  const mutate = useCallback(
    async (promiseCallback: () => Promise<T>) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await promiseCallback();
        setData(response);
        onSuccess?.();
      } catch (err: any) {
        setError(err);
        onError?.();
      } finally {
        setLoading(false);
      }
    },
    [onSuccess, onError]
  );

  return { loading, error, data, mutate };
};
