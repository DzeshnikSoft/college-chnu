import { ReactNode, useState, useEffect } from 'react';
import DeleteButton from '@/components/DeleteButton';
import { useAppDispatch } from '@/app/hooks';
import { deletePage } from '@/app/features/pages/pageThunks';
import { Link } from 'react-router-dom';
import ButtonArrow from '@/components/ButtonArrow';
import { movePage } from '@/app/features/categories/categorySlice';

interface ListItemProps {
	children?: ReactNode;
	id: string;
	subCategoryId: string;
	url: string;
	parentUrl: string;
	pagesLength: number;
	index: number;
}

export default function ListItem({
	children,
	id,
	parentUrl,
	url,
	subCategoryId,
	pagesLength,
	index,
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

	const downButtonClick = (e) => {
		e.preventDefault();
		e.stopPropagation();

		const nextItemIndex = index + 1;
		dispatch(
			movePage({
				currentIndex: index,
				newIndex: nextItemIndex,
				subCategoryId,
			})
		);
	};

	const upButtonClick = (e) => {
		e.preventDefault();
		e.stopPropagation();

		const prevItemIndex = index - 1;

		dispatch(
			movePage({
				currentIndex: index,
				newIndex: prevItemIndex,
				subCategoryId,
			})
		);
	};

	return (
		<Link to={`/edit-page${relativeUrl}${url}`}>
			<li
				className='p-2 cursor-pointer relative border-b last:border-b-0 hover:bg-activeItems'
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}>
				{children}
				{isHovering === true && (
					<div className='top-1/2 right-0 w-fit !absolute transform flex -translate-y-1/2 gap-3 items-center'>
						{pagesLength !== 1 && index !== pagesLength - 1 && (
							<ButtonArrow
								type='bottom'
								onClick={downButtonClick}
								className='!h-7 !w-5'
							/>
						)}

						{pagesLength !== 1 && index !== 0 && (
							<ButtonArrow
								type='top'
								onClick={(e) => {
									upButtonClick(e);
								}}
								className='!h-7 !w-5'
							/>
						)}
						<DeleteButton
							onClick={handleDelete}
							className='!w-5 !h-7 !text-sm !pl-0 !pr-0 !mr-1'
						/>
					</div>
				)}
			</li>
		</Link>
	);
}
