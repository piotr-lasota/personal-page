/* eslint-disable import/prefer-default-export,@typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const wrapPageElement = ({ element }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
  );
};
