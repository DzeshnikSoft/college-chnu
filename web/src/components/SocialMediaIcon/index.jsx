import { useState, useEffect } from 'react';

function SocialMediaIcon({ name }) {
	const [iconData, setIconData] = useState({
		className: '',
		url: '',
	});

	useEffect(() => {
		switch (name) {
			case 'instagram':
				setIconData({
					className: 'fab fa-instagram',
					url: 'https://www.instagram.com',
				});
				return;
			case 'facebook':
				setIconData({
					className: 'fab fa-facebook-f',
					url: 'https://www.facebook.com',
				});
				return;
			case 'tiktok':
				setIconData({
					className: 'fab fa-tiktok',
					url: 'https://www.tiktok.com',
				});
				return;
			default:
				return '';
		}
	}, []);

	return (
		<a href={iconData.url} target='_blank' rel='noreferrer'>
			<i
				className={`text-accentTextColor cursor-pointer text-2xl duration-100 hover:text-mainTextColor hover:scale-105 ${iconData.className}`}></i>
		</a>
	);
}

export default SocialMediaIcon;
