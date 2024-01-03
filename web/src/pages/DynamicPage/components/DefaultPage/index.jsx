import React from 'react';
import DOMPurify from 'dompurify';

function DefaultPage({ content }) {
	const sanitizedHtml = DOMPurify.sanitize(content);
	return (
		<div
			className='w-10/12 mx-auto'
			dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
		/>
	);
}

export default DefaultPage;
