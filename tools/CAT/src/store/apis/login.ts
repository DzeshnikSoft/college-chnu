import { CollegeAdmin } from '@/models/college-admin';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
	// TODO: Remove that URL after merge
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://localhost:5001/api/',
		credentials: 'include',
	}),
	endpoints: (builder) => ({
		login: builder.mutation<any, CollegeAdmin>({
			query: (collegeAdmin: CollegeAdmin) => ({
				url: '/login',
				method: 'POST',
				body: collegeAdmin,
			}),
		}),
	}),
});

export const { useLoginMutation } = loginApi;
