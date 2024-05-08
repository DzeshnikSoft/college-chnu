import { NavLink } from 'react-router-dom';
import DOMPurify from 'dompurify';

function SearchWrapper({ title, searhData }) {
	return (
		<div className='w-full h-full gap-5 my-5'>
			<h3 className='text-colorTextColor text-2xl font-semibold'>
				{title}:
			</h3>
			<div className='flex flex-col gap-5'>
				{searhData?.map((item) => (
					<SearchItem
						key={item.id}
						itemTitle={item.title}
						highlightedSentences={item.highlightedSentences}
						url={item.url}
					/>
				))}
			</div>
		</div>
	);
}

function SearchItem({ itemTitle, highlightedSentences, url }) {
	return (
		<NavLink
			to={url}
			className='flex flex-col border cursor-pointer duration-200 border-colorTextColor rounded-lg p-3 hover:bg-accentTextColor/10 hover:border-accentTextColor first:mt-5 last:mb-5'>
			<p className='text-colorTextColor text-lg flex items-center font-medium'>
				{itemTitle}
			</p>
			<p className='text-accentTextColor/90 font-normal'>
				Знайдено: {highlightedSentences.length} співпадіння
			</p>
			{highlightedSentences?.map((item) => (
				<Sentence sentence={item} />
			))}
		</NavLink>
	);
}

function Sentence({ sentence }) {
	const sanitizedHtml = DOMPurify.sanitize(sentence);
	return (
		<div
			className='text-sm w-full text-colorTextColor'
			dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
	);
}
export default SearchWrapper;
