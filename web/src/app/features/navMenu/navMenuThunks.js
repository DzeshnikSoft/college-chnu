import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient } from '../../apiClient';

export const fetchCategoriesData = createAsyncThunk('navMenu/get', async () => {
	const { data } = await apiClient.get('/api/Categories');

	return data;
});
