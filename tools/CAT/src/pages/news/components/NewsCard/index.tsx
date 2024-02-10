import IconPanel from '../IconPanel';
import styles from '../NewsCard/style.module.css';
import { formatUkrainianDateTime } from '@/helpers/date';
import { useAppDispatch } from '@/app/hooks';
import { deleteNews } from '@/app/features/news/newsThunks';
import { Link } from 'react-router-dom';
import { fetchNewsData } from '@/app/features/news/newsThunks';
interface NewsCardProps {
	id: string;
	image: string;
	title?: string;
	description: string;
	date: string;
	pinned: boolean;
}

function NewsCard({
	image,
	title = '',
	description,
	date,
	id,
	pinned,
}: NewsCardProps) {
	const dispatch = useAppDispatch();

	const handleDelete = () => {
		dispatch(deleteNews(id))
			.then(() => {
				dispatch(
					fetchNewsData({
						pageNumber: 1,
						pageSize: 4,
						searchTerm: '',
					})
				);
			})
			.catch((error) => {});
	};

	return (
		<div className={`w-full h-fit border rounded-2xl ${styles.newsCard}`}>
			<div className='w-full h-60 flex gap-3 rounded-2xl overflow-hidden'>
				<div className='w-6/12 h-full overflow-hidden'>
					<img
						src={image}
						alt=''
						className='w-full h-full object-cover'
					/>
				</div>
				<div className='w-6/12 p-2'>
					<h3 className='tracking-widest text-colorTextColor italic font-black text-lg  truncate w-full'>
						{title}
					</h3>
					<p className='text-colorTextColor w-full overflow-hidden font-medium text-justify mt-2 text-base'>
						{description}
					</p>
					<p className='text-sm mt-2 text-[#999999]'>
						{formatUkrainianDateTime(date)}
					</p>
				</div>
			</div>
			<div
				className={`left-1/2 flex w-fit -translate-x-2/4 duration-200 bg-white -translate-y-2/4 rounded-t-md ${styles.cardPanel}`}>
				{pinned ? (
					<IconPanel
						classNameIcon='fa-solid fa-bookmark-slash'
						className='hover:bg-[#390972]'>
						Відкріпити
					</IconPanel>
				) : (
					<IconPanel
						classNameIcon='fa-solid fa-bookmark'
						className='hover:bg-[#390972]'>
						Закріпити
					</IconPanel>
				)}
				<Link className='h-full' to={`/edit-news/${id}`}>
					<IconPanel
						classNameIcon='fa-solid fa-pencil '
						className='hover:bg-[#38a169]'>
						Оновити
					</IconPanel>
				</Link>

				<IconPanel
					onClick={handleDelete}
					classNameIcon='fa-solid fa-trash'
					className='hover:bg-[#e53e3e]'>
					Видалити
				</IconPanel>
			</div>
		</div>
	);
}

export default NewsCard;
