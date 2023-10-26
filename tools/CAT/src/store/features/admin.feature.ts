import { CategoryDto } from '@/models/api';
import { pagesItems } from '@/utils/pagesItems';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from '../state';

export interface AdminState {
	items: CategoryDto[] | null;
	loading: boolean;
}

const initialState: AdminState = {
	items: [...pagesItems],
	loading: true,
};

const pagesAdminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		changeTitleCategory(
			state: AdminState,
			action: PayloadAction<{ id: string; newTitle: string }>
		) {
			const { id, newTitle } = action.payload;
			state.items = state.items.map((item) => {
				if (item.id === id) {
					return { ...item, title: newTitle };
				}
				return item;
			});
		},
		changeTitleItemSubCategories(
			state: AdminState,
			action: PayloadAction<{ id: string; newTitle: string }>
		) {
			const { id, newTitle } = action.payload;
			state.items = state.items.map((category) => {
				category.subCategories = category.subCategories.map((item) => {
					if (item.id === id) {
						return { ...item, title: newTitle };
					}
					return item;
				});
				return category;
			});
		},
	},
});

export const { changeTitleCategory, changeTitleItemSubCategories } =
	pagesAdminSlice.actions;

export const selectUser = (state: AppState): AdminState => state.admin;

export default pagesAdminSlice.reducer;
