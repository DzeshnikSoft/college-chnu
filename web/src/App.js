import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from './pages';
import './App.css';
import {
	getNavMenuLoading,
	getNavMenuData,
} from './app/features/navMenu/navMenuSlice';
import SpinnerWrapper from './components/SpinnerWrapper';
import { fetchCategoriesData } from './app/features/navMenu/navMenuThunks';

const router = createBrowserRouter(routes);

function App() {
	const dispatch = useDispatch();
	const loadingNavMenuData = useSelector(getNavMenuLoading);
	const navMenuData = useSelector(getNavMenuData);

	useEffect(() => {
		navMenuData.length === 0 && dispatch(fetchCategoriesData());
	}, []);

	return loadingNavMenuData ? (
		<div className='w-full h-screen'>
			<SpinnerWrapper />
		</div>
	) : (
		<RouterProvider router={router} />
	);
}

export default App;
