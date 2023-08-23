import { createSPAClient } from './apiClient';

export const signInWithPassword = async (email: string, password: string) => {
  const apiClient = createSPAClient();

  return apiClient.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  const apiClient = createSPAClient();

  return apiClient.auth.signOut();
};
