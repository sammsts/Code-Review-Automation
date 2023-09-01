import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { PrimeReactProvider } from 'primereact/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PrimeReactProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </PrimeReactProvider>
);

