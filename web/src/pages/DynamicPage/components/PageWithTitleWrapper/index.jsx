import DefaultPage from '../DefaultPage';
import TitlePage from './TitlePage';

function PageWithTitleWrapper({ content, url, label }) {
	return (
		<div className='w-full h-fit flex flex-col'>
			<TitlePage url={url}>{label}</TitlePage>
			<DefaultPage content={content} />
		</div>
	);
}

export default PageWithTitleWrapper;
