import { configureStore } from '@reduxjs/toolkit';
import { categoriesApi } from './apis/categories';

export const store = configureStore({
	reducer: {
		[categoriesApi.reducerPath]: categoriesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(categoriesApi.middleware),
});
