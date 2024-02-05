import { NewsDto } from '@/models/api';
import { fetchNewsData, updateNews, addNews, deleteNews } from './newsThunks';
import { sortNewsArrayByPinnedAndDate } from '@/helpers/sort';
export const extraReducersConfigNews = (builder) => {
	//get
	builder.addCase(fetchNewsData.pending, (state) => {
		state.loading = true;
		state.error = null;
	});
	builder.addCase(fetchNewsData.fulfilled, (state, { payload }) => {
		state.data = payload;
		state.loading = false;
	});
	builder.addCase(fetchNewsData.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
	//add
	builder.addCase(addNews.pending, (state) => {
		state.loading = true;
		state.error = null;
	});
	builder.addCase(addNews.fulfilled, (state, { payload }) => {
		state.data = {
			...state.data,
			data: [...state.data?.data, payload],
		};
		state.news.data = sortNewsArrayByPinnedAndDate(state.news.data);
		state.loading = false;
	});

	builder.addCase(addNews.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
	//update
	builder.addCase(updateNews.pending, (state) => {
		state.loading = true;
		state.error = null;
	});
	builder.addCase(updateNews.fulfilled, (state, { payload }) => {
		const indexToUpdate = state.data?.data.findIndex(
			(news) => news.id === payload.id
		);

		if (indexToUpdate !== -1) {
			state.data = {
				...state.data,
				data: state.data?.data.map((news, index) =>
					index === indexToUpdate ? payload : news
				),
			};

			state.news.data = sortNewsArrayByPinnedAndDate(state.news.data);
		}

		state.loading = false;
	});

	builder.addCase(updateNews.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
	//delete
	builder.addCase(deleteNews.pending, (state) => {
		state.loading = true;
		state.error = null;
	});
	builder.addCase(deleteNews.fulfilled, (state, { payload }) => {
		state.data = {
			...state.data,
			data: state.data?.data?.filter(
				(news: NewsDto) => news.id !== payload
			),
		};
		state.loading = false;
	});
	builder.addCase(deleteNews.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
};
