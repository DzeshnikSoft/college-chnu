import { createSlice } from '@reduxjs/toolkit';
import extraReducersConfigNavMenu from './navMenuExtraReducers';

const initialState = {
	navMenuData: [],
	loading: true,
};

const navMenuSlice = createSlice({
	name: 'navMenu',
	initialState,
	reducers: {},
	extraReducers: (builder) => extraReducersConfigNavMenu(builder),
});

export const getNavMenuData = (state) => state.navMenu.navMenuData;

export const getNavMenuLoading = (state) => state.navMenu.loading;

export default navMenuSlice.reducer;
