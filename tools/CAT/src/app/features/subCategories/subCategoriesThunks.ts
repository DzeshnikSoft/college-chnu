import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '@/app/apiClient';
import { SubCategoriesStateApi } from '@/models/subCategories';
import { getErrorMessage } from '@/factories/errorMessage.factory';

const url = 'api/SubCategory';

export const addSubCategory = createAsyncThunk(
	'SubCategories/add',
	async (postData: SubCategoriesStateApi, thunkAPI) => {
		try {
			const { data } = await apiClient.post(url, postData);
			return { ...data, categoryId: postData.categoryId };
		} catch (error) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);

export const updateSubCategory = createAsyncThunk(
	'SubCategories/update',
	async (postData: SubCategoriesStateApi, thunkAPI) => {
		try {
			const { data } = await apiClient.put(url, postData);
			return data;
		} catch (error) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);

export const deleteSubCategory = createAsyncThunk(
	'SubCategories/delete',
	async (subCategoryId: string, thunkAPI) => {
		try {
			const { data } = await apiClient.delete(`${url}/${subCategoryId}`);
			return subCategoryId;
		} catch (error) {
			const { data } = error.response;
			return thunkAPI.rejectWithValue(getErrorMessage(data));
		}
	}
);
