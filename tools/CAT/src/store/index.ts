import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../store/features/user.feature";
import adminReducer from "./features/admin.feature";

export const store = configureStore({
	reducer: {
		user: userReducer,
		admin: adminReducer,
	},
});
