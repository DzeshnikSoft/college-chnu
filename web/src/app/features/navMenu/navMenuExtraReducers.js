import { fetchCategoriesData } from './navMenuThunks';

const extraReducersConfigNavMenu = (builder) => {
	builder.addCase(fetchCategoriesData.fulfilled, (state, action) => {
		state.navMenuData = action.payload;
		state.loading = false;
	});
	builder.addCase(fetchCategoriesData.pending, (state) => {
		state.loading = true;
	});
	builder.addCase(fetchCategoriesData.rejected, (state) => {
		state.loading = false;
	});
};

export default extraReducersConfigNavMenu;
