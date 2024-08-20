import IconPanel from '@/pages/news/components/IconPanel';
import styles from '../SeparatePage/style.module.css';

function SeparatePage() {
	return (
		<div
			className={`w-full h-24 rounded-md border p-2 ${styles.separatePage}`}>
			<p className='text-2xl'>Нова сторінка</p>
			<p className='text-xl text-gray-400'>шлях</p>
			<div
				className={`left-1/2 cursor-pointer flex w-fit -translate-x-2/4 duration-200 bg-white -translate-y-2/4 rounded-t-md ${styles.separatePagePanel}`}>
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

export default SeparatePage;
