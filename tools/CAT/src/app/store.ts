import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './features/categories/categorySlice';
import pageReducer from './features/pages/pageSlice';
import newsReducer from './features/news/newsSlice';

const store = configureStore({
	reducer: {
		category: categoryReducer,
		page: pageReducer,
		news: newsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
