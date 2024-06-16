import { configureStore } from '@reduxjs/toolkit';
import navMenuSliceReducer from './features/navMenu/navMenuSlice';
import newsSliceReducer from './features/news/newsSlice';
export const store = configureStore({
	reducer: {
		navMenu: navMenuSliceReducer,
		news: newsSliceReducer,
	},
});
