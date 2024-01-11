import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './features/categories/categorySlice';
import pageReducer from './features/pages/pageSlice';
const store = configureStore({
	reducer: {
		category: categoryReducer,
		page: pageReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
