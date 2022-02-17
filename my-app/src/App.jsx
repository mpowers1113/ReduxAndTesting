// import React from 'react';
// import { Route, Routes, BrowserRouter } from 'react-router';
import React from 'react';
import Home from './Components/Home';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
