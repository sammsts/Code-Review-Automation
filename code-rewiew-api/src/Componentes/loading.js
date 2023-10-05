import React from 'react';
import ReactDOM from 'react-dom';
import { Flex } from '@chakra-ui/react';
import { ProgressSpinner } from 'primereact/progressspinner';

const LoadingComponent = () => {
  return (
    <Flex
      align="center"
      justify="center"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={9999}
    >
      <ProgressSpinner style={{width: '60px', height: '60px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </Flex>
  );
};

export const showLoading = (id) => {
  const loadingElement = document.createElement('div');
  loadingElement.setAttribute('id', 'loading-container');
  loadingElement.style.position = 'fixed';
  loadingElement.style.top = '0';
  loadingElement.style.left = '0';
  loadingElement.style.right = '0';
  loadingElement.style.bottom = '0';
  loadingElement.style.background = 'rgba(0, 0, 0, 0.5)';
  loadingElement.style.zIndex = '9999';

  const targetElement = document.getElementById(id);
  if (targetElement) {
    targetElement.appendChild(loadingElement);
    ReactDOM.render(<LoadingComponent />, loadingElement);
  }
};

export const hideLoading = (id) => {
  const loadingElement = document.getElementById('loading-container');

  if (loadingElement) {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.removeChild(loadingElement);
    }
  }
};

// Exemplo de uso
showLoading('root'); // 'root' é o ID do elemento onde o spinner deve ser exibido

// Para ocultar o spinner, você pode chamar a função hideLoading
// hideLoading('root');
