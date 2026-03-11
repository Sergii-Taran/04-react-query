import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'modern-normalize';
import './global.css';
import App from './components/App/App.tsx';

import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-right" />
    </QueryClientProvider>
  </StrictMode>
);
