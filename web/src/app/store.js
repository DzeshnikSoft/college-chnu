import { configureStore } from '@reduxjs/toolkit';
import navMenuSliceReducer from './features/navMenu/navMenuSlice';

export const store = configureStore({
	reducer: {
		navMenu: navMenuSliceReducer,
	},
});
