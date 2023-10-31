import { CollegeAdmin } from "@/models/college-admin";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/store/baseUrl";
export const loginApi = createApi({
	// TODO: Remove that URL after merge
	baseQuery,
	endpoints: (builder) => ({
		login: builder.mutation<any, CollegeAdmin>({
			query: (collegeAdmin: CollegeAdmin) => ({
				url: "/login",
				method: "POST",
				body: collegeAdmin,
			}),
		}),
	}),
});

export const { useLoginMutation } = loginApi;
