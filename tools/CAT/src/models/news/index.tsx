import { ImageDto } from '../api';

export interface NewsStateApi {
	title: string;
	image: ImageDto;
	description: string;
	content: string;
	pinned?: boolean;
	url: string;
	titleBackgroundImage: ImageDto;
	date: string;
}
