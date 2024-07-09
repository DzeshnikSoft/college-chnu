export interface CategoriesStateApi {
	categoryId?: string;
	title: string;
	url: string;
}

interface PageOrdering {
	pageId: string;
}

interface SubCategoryOrdering {
	subCategoryId: string;
	pages: PageOrdering[];
}

export interface CategoryOrdering {
	categoryId: string;
	subCategories: SubCategoryOrdering[];
}
