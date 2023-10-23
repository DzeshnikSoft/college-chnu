import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ChakraProvider } from '@chakra-ui/react';

import App from './App.tsx';
import { store } from './store/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</ChakraProvider>
	</React.StrictMode>
);
