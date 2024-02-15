import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../apiClient';

const url = 'api/News';

export const fetchNewsData = createAsyncThunk(
	'news/get',
	async ({ pageNumber, pageSize, searchTerm }, thunkAPI) => {
		try {
			const responce = await apiClient.get(
				`${url}?PageSize=${pageSize}&PageNumber=${pageNumber}&searchTerm=${searchTerm}`
			);
			return responce.data;
		} catch (error) {}
	}
);
