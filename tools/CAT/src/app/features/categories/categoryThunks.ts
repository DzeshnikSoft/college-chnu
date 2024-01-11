import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/app/apiClient';
import { CategoriesStateApi } from '@/models/categories';
const url = 'api/Categories';

export const fetchCategoriesData = createAsyncThunk(
	'categories/get',
	async (_, thunkAPI) => {
		try {
			const { data } = await apiClient.get(url);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Failed to fetch categories');
		}
	}
);

export const addCategory = createAsyncThunk(
	'categories/add',
	async (postData: CategoriesStateApi, thunkAPI) => {
		try {
			const { data } = await apiClient.post(url, postData);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Failed to add categories');
		}
	}
);

export const updateCategory = createAsyncThunk(
	'categories/update',
	async (postData: CategoriesStateApi, thunkAPI) => {
		try {
			const { data } = await apiClient.put(url, postData);
			return data;
		} catch (error) {
			return thunkAPI.rejectWithValue('Failed to update categories');
		}
	}
);

export const deleteCategory = createAsyncThunk(
	'categories/delete',
	async (categoryId: string, thunkAPI) => {
		try {
			const { data } = await apiClient.delete(`${url}/${categoryId}`);
			return categoryId;
		} catch (error) {
			return thunkAPI.rejectWithValue('Failed to delete categories');
		}
	}
);
