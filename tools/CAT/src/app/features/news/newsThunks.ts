import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/app/apiClient';
import { getErrorMessage } from '@/factories/errorMessage.factory';
import { PaginationFilterModel } from '@/models/pagination';
import { NewsStateApi } from '@/models/news';

const url = 'api/News';

export const fetchNewsData = createAsyncThunk(
	'news/get',
	async (
		{ pageNumber, pageSize, SearchTerm }: PaginationFilterModel,
		thunkAPI
	) => {
		try {
			const responce = await apiClient.get(
				`${url}?PageSize=${pageSize}&PageNumber=${pageNumber}&SearchTerm=${SearchTerm}`
			);
			const { data } = responce;
			return data;
		} catch (error) {
			const { data } = error.responce;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);

export const addNews = createAsyncThunk(
	'news/add',
	async (postData: NewsStateApi, thunkAPI) => {
		try {
			await apiClient.post(url, postData);
			return postData;
		} catch (error) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);

export const updateNews = createAsyncThunk(
	'news/update',
	async (putData: NewsStateApi, thunkAPI) => {
		try {
			await apiClient.put(url, putData);
			return putData;
		} catch (error) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);

export const deleteNews = createAsyncThunk(
	'news/delete',
	async (newsId: string, thunkAPI) => {
		try {
			await apiClient.delete(`${url}/${newsId}`);
			return newsId;
		} catch (error) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);
