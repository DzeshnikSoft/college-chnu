import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/app/apiClient';
import { PageDto } from '@/models/api';
import { getErrorMessage } from '@/factories/errorMessage.factory';

const url = 'api/Page';

export const fetchPageByPath = createAsyncThunk(
	'Page/getByPath',
	async (path: string, thunkAPI) => {
		try {
			const { data } = await apiClient.get(`${url}/by-path?path=${path}`);
			return data;
		} catch (error) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);

export const addPage = createAsyncThunk(
	'Page/add',
	async (postData: PageDto) => {
		try {
			const { data } = await apiClient.post(url, postData);
			return data;
		} catch (error) {
			return getErrorMessage(error.reasonCode);
		}
	}
);

export const updatePage = createAsyncThunk(
	'Page/update',
	async (postData: PageDto) => {
		try {
			const { data } = await apiClient.put(url, postData);
			return data;
		} catch (error) {
			return getErrorMessage(error.reasonCode);
		}
	}
);

export const deletePage = createAsyncThunk(
	'Page/delete',
	async (id: string) => {
		try {
			const { data } = await apiClient.delete(`${url}/${id}`);
			return id;
		} catch (error) {
			return getErrorMessage(error.reasonCode);
		}
	}
);
