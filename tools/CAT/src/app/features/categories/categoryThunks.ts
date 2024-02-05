import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/app/apiClient';
import { CategoriesStateApi } from '@/models/categories';
import { getErrorMessage } from '@/factories/errorMessage.factory';

const url = 'api/Categories';

export const fetchCategoriesData = createAsyncThunk(
	'categories/get',
	async (_, thunkAPI) => {
		try {
			const response = await apiClient.get(url);
			const { data } = response;
			return { data };
		} catch (error) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);

export const addCategory = createAsyncThunk(
	'categories/add',
	async (postData: CategoriesStateApi, thunkAPI) => {
		try {
			const response = await apiClient.post(url, postData);
			const { data } = response;
			return { data };
		} catch (error) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);

export const updateCategory = createAsyncThunk(
	'categories/update',
	async (postData: CategoriesStateApi, thunkAPI) => {
		try {
			const response = await apiClient.put(url, postData);
			const { data } = response;
			return { data };
		} catch (error) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);

export const deleteCategory = createAsyncThunk(
	'categories/delete',
	async (categoryId: string, thunkAPI) => {
		try {
			await apiClient.delete(`${url}/${categoryId}`);

			return categoryId;
		} catch (error) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);
