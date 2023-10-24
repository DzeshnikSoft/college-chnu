import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../store/features/user.feature";
import pagesAdminReducer from "../store/features/pagesAdmin.feature";

export const store = configureStore({
	reducer: {
		user: userReducer,
		pagesAdmin: pagesAdminReducer,
	},
});
