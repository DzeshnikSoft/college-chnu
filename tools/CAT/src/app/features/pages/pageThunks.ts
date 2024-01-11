import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/app/apiClient';
import { PageDto } from '@/models/api';

const url = 'api/Page';

export const fetchPageByPath = createAsyncThunk(
	'Page/getByPath',
	async (path: string, thunkAPI) => {
		try {
			const { data } = await apiClient.get(`${url}/by-path?path=${path}`);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Failed to fetch page');
		}
	}
);

export const addPage = createAsyncThunk(
	'Page/add',
	async (postData: PageDto, thunkAPI) => {
		try {
			const { data } = await apiClient.post(url, postData);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Failed to fetch categories');
		}
	}
);

export const updatePage = createAsyncThunk(
	'Page/update',
	async (postData: PageDto, thunkAPI) => {
		try {
			const { data } = await apiClient.put(url, postData);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Failed to fetch categories');
		}
	}
);

export const deletePage = createAsyncThunk(
	'Page/delete',
	async (id: string, thunkAPI) => {
		try {
			const { data } = await apiClient.delete(`${url}/${id}`);
			return id;
		} catch (error) {
			return thunkAPI.rejectWithValue('Failed to fetch categories');
		}
	}
);
