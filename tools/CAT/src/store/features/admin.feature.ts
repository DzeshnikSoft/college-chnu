import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pagesItems } from "@/utils/pagesItems";
import { AppState } from "../state";
import { CategoryDto } from "@/models/api";

export interface adminState {
	items: CategoryDto[] | null;
	loading: boolean;
}

const initialState: adminState = {
	items: [...pagesItems],
	loading: true,
};

const pagesAdminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		changeTitleCategory(
			state: adminState,
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
			state: adminState,
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

export const selectUser = (state: AppState): adminState => state.admin;

export default pagesAdminSlice.reducer;
