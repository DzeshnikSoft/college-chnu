import { User } from '@/models/user';
import { createSlice } from '@reduxjs/toolkit';

import { AppState } from '../state';

export interface UserState {
	data: User | null;
	loading: boolean;
}

const initialState: UserState = {
	data: { fullName: 'Makson Maryanchuk', avatar: '' },
	loading: true,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
});

export default userSlice.reducer;

export const selectUser = (state: AppState): UserState => state.user;
