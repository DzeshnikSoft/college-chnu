import styles from '../PersonalCard/style.module.css';
import IconPanel from '../../../news/components/IconPanel';

interface PersonalCardProps {
	image: string;
	description: string;
	posada: string;
}

function PersonalCard({ image, description, posada }: PersonalCardProps) {
	return (
		<div className={`w-full h-[250px] flex gap-5 ${styles.personalCard}`}>
			<div className='w-5/12 h-full rounded-md overflow-hidden'>
				<img
					src={image}
					className='h-full w-full object-cover'
					alt=''
				/>
			</div>
			<div className='w-7/12'>
				<p className='text-2xl mt-3 italic font-medium'>{posada}</p>
				<p className='text-lg mt-3 italic '>{description}</p>
			</div>
			<div
				className={`left-1/2 cursor-pointer flex w-fit -translate-x-2/4 duration-200 bg-white -translate-y-2/4 rounded-t-md ${styles.cardPanel}`}>
				<IconPanel
					classNameIcon='fa-solid fa-pencil '
					className='hover:bg-[#38a169]'>
					Оновити
				</IconPanel>

				<IconPanel
					// onClick={handleDelete}
					classNameIcon='fa-solid fa-trash'
					className='hover:bg-[#e53e3e]'>
					Видалити
				</IconPanel>
			</div>
		</div>
	);
}

export default PersonalCard;
