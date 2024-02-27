import { fetchNewsData } from './newsThunks';

export const extraReducersConfigNews = (builder) => {
	//get
	builder.addCase(fetchNewsData.pending, (state) => {
		state.loading = true;
	});
	builder.addCase(fetchNewsData.fulfilled, (state, { payload }) => {
		state.data = payload;
		state.loading = false;
	});
	builder.addCase(fetchNewsData.rejected, (state) => {
		state.loading = false;
	});
};
