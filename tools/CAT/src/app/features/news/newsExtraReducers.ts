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
		state.newsData = payload;
		state.loading = false;
		state.error = null;
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
		state.newsData = {
			...state.newsData,
			data: [...state.newsData?.data, payload],
		};
		state.news.data = sortNewsArrayByPinnedAndDate(state.news.data);
		state.loading = false;
		state.error = null;
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
		const indexToUpdate = state.newsData?.data.findIndex(
			(news) => news.id === payload.id
		);

		if (indexToUpdate !== -1) {
			state.newsData = {
				...state.newsData,
				data: state.newsData?.data.map((news, index) =>
					index === indexToUpdate ? payload : news
				),
			};

			state.news.data = sortNewsArrayByPinnedAndDate(state.news.data);
		}

		state.loading = false;
		state.error = null;
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
		state.newsData = {
			...state.newsData,
			data: state.newsData?.data?.filter(
				(news: NewsDto) => news.id !== payload
			),
		};
		state.loading = false;
		state.error = null;
	});
	builder.addCase(deleteNews.rejected, (state, { payload }) => {
		state.loading = false;
		state.error = (payload as string) || 'Something went wrong';
	});
};
