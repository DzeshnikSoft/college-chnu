import { NavLink } from 'react-router-dom';
import { formatUkrainianDateTime } from '../../helpers/date';

function News({ title, description, image, url, date }) {
	return (
		<div className='w-full h-96 laptopXl:h-[450px] lg:h-[350px] rounded-t-lg border-b-colorTextColor border-b-[1px] flex flex-col overflow-hidden pb-3'>
			<div className='h-[60%] w-full'>
				<img
					src={image.url}
					alt=''
					className='w-full h-full object-cover'
				/>
			</div>
			<div className='flex backdrop-blur-sm h-[40%] flex-col justify-between'>
				<h3 className='tracking-widest font-black text-colorTextColor truncate text-xl'>
					{title}
				</h3>
				<p className='text-colorTextColor text-justify lg:text-left lg:text-sm truncate-css h-3/6 lg:h-[60px] w-full'>
					{description}
				</p>
				<div className='flex justify-between w-full'>
					<NavLink
						to={`/news/${url}`}
						className='text-accentTextColor lg:text-sm  hover:underline duration-100'>
						Детальніше
					</NavLink>
					<span className='text-end text-sm lg:text-xs text-[#999999]'>
						{formatUkrainianDateTime(date)}
					</span>
				</div>
			</div>
		</div>
	);
}

export default News;
