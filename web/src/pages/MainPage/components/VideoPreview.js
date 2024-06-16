import React from 'react';
import YouTube from 'react-youtube';

const VideoPreview = () => {
	const onPlayerReady = (event) => {
		event.target.pauseVideo();
	};

	const opts = {
		height: '100%',
		width: '100%',
	};
	return (
		<YouTube
			className='h-full w-full'
			videoId='mrEUV2RebXo'
			opts={opts}
			onReady={onPlayerReady}
		/>
	);
};

export default VideoPreview;
