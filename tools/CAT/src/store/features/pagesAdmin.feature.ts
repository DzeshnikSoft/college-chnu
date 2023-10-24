import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pagesItems } from "@/utils/pagesItems";
import { AppState } from "../state";
import { CategoryDto } from "@/models/api";

export interface PageAdminState {
	items: CategoryDto[] | null;
	loading: boolean;
}

const initialState: PageAdminState = {
	items: [...pagesItems],
	loading: true,
};

const pagesAdminSlice = createSlice({
	name: "pagesAdmin",
	initialState,
	reducers: {
		changeTitleCategory(
			state: PageAdminState,
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
			state: PageAdminState,
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

export const selectUser = (state: AppState): PageAdminState => state.pageAdmin;

export default pagesAdminSlice.reducer;
