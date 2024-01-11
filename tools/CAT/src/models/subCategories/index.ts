import { PageDto } from '../api';
// this model will be until Maks adds the categoryId to subCategories model)
export interface SubCategoryResState {
	id: string;
	url: string;
	title: string;
	categoryId: string;
	pages: PageDto[];
}

export interface SubCategoriesStateApi {
	categoryId?: string;
	title: string;
	url: string;
}
export interface SubCategoriesStateDeleteApi {
	categoryId: string;
	subCategoryId: string;
}
