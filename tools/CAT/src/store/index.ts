import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../store/features/user.feature';

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
});
