import { ClipLoader } from 'react-spinners';

function SpinnerWrapper() {
	return (
		<div className='w-full h-full flex items-center justify-center'>
			<ClipLoader size={100} className='m-auto' />
		</div>
	);
}

export default SpinnerWrapper;
