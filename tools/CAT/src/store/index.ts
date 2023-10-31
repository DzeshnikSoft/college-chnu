import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../store/features/user.feature';
import { loginApi } from './apis/login';
import adminReducer from './features/admin.feature';

export const store = configureStore({
	reducer: {
		user: userReducer,
		admin: adminReducer,
		[loginApi.reducerPath]: loginApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginApi.middleware),
});
