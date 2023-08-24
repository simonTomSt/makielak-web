'use client';
import { RowType } from '@/api';
import { createContext, useContext, ReactNode } from 'react';

interface CategoriesContextType {
  categories: RowType<'categories'>[];
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export const useCategoriesContext = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error(
      'useCategoriesContext must be used within a CategoriesProvider'
    );
  }
  return context;
};

interface CategoriesProviderProps {
  categories: RowType<'categories'>[];
  children: ReactNode;
}

export const CategoriesProvider = ({
  categories,
  children,
}: CategoriesProviderProps) => {
  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
