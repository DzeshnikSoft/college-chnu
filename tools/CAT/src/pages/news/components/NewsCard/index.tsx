import IconPanel from '../IconPanel';
import styles from '../NewsCard/style.module.css';

interface NewsCardProps {
	image: string;
	title?: string;
	description: string;
	date: string;
}

function NewsCard({ image, title = '', description, date }: NewsCardProps) {
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
						{title} Заголовок для новини
					</h3>
					<p className='text-colorTextColor w-full overflow-hidden font-medium text-justify mt-2 text-base'>
						{description}
					</p>
					<p className='text-sm mt-2 text-[#999999]'>{date}</p>
				</div>
			</div>
			<div
				className={`left-1/2 flex w-fit -translate-x-2/4 duration-200 bg-white -translate-y-2/4 rounded-t-md ${styles.cardPanel}`}>
				<IconPanel classNameIcon='fa-solid fa-bookmark'>
					Закріпити
				</IconPanel>
				{/* fa-solid fa-bookmark-slash */}
				<IconPanel classNameIcon='fa-solid fa-pencil'>
					Оновити
				</IconPanel>
				<IconPanel classNameIcon='fa-solid fa-trash'>
					Видалити
				</IconPanel>
			</div>
		</div>
	);
}

export default NewsCard;
