import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from './app/hooks';
import { getPositionNavMenuItemsIsUpdatedSelector } from './app/features/positionNavMenuItems/positionNavMenuItemsSlice';
import router from './pages/routes';

function App() {
	const isUpdatedPositionNavMenuItems = useAppSelector(
		getPositionNavMenuItemsIsUpdatedSelector
	);

	useEffect(() => {
		const handleBeforeUnload = (event) => {
			if (!isUpdatedPositionNavMenuItems) {
				event.preventDefault();
				alert();
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [isUpdatedPositionNavMenuItems]);

	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer />
		</>
	);
}

export default App;
