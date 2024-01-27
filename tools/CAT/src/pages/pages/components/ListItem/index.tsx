import { ReactNode, useState, useEffect } from 'react';
import DeleteButton from '@/components/DeleteButton';
import { useAppDispatch } from '@/app/hooks';
import { deletePage } from '@/app/features/pages/pageThunks';
import { Link } from 'react-router-dom';

interface ListItemProps {
	children?: ReactNode;
	id: string;
	subCategoryId: string;
	url: string;
	parentUrl: string;
}

export default function ListItem({
	children,
	id,
	parentUrl,
	url,
}: ListItemProps) {
	const [isHovering, setIsHovering] = useState<boolean>(false);
	const [relativeUrl, setRelativeUrl] = useState<string>('');
	const handleMouseOver = () => {
		setIsHovering(true);
	};
	const dispatch = useAppDispatch();

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	const handleDelete = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(deletePage(id));
	};

	useEffect(() => {
		const relativePath = parentUrl.replace('https://college-chnu', '');
		setRelativeUrl(relativePath);
	}, [parentUrl]);

	return (
		<Link to={`/edit-page${relativeUrl}${url}`}>
			<li
				className='p-2 cursor-pointer relative border-b last:border-b-0 hover:bg-activeItems'
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}>
				{children}
				{isHovering === true && (
					<DeleteButton
						onClick={handleDelete}
						className='!w-5 !h-7 !text-sm !pl-0 !pr-0 top-1/2 right-0 !absolute transform -translate-x-1/2 -translate-y-1/2'
					/>
				)}
			</li>
		</Link>
	);
}
