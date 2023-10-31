import { configureStore } from '@reduxjs/toolkit';
import { logger } from '@reduxjs/toolkit'
import userReducer from '../store/features/user.feature';
import { loginApi } from './apis/login';
import adminReducer from './features/admin.feature';
import { categoriesApi } from './api/categories';
export const store = configureStore({
	reducer: {
		user: userReducer,
		admin: adminReducer,
		[loginApi.reducerPath]: loginApi.reducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>  getDefaultMiddleware()
	.concat([logger,categoriesApi,loginApi])
});
