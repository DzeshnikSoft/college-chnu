// ..\..\services\College.Domain\DTOs\CategoryDto.cs
export interface CategoryDto {
	id: string;
	url: string;
	title: string;
	subCategories: SubCategoryDto[];
}

// ..\..\services\College.Domain\DTOs\NewsDto.cs
export interface NewsDto {
	id?: string;
	title: string;
	image: ImageDto;
	description: string;
	content: string;
	pinned?: boolean;
	url: string;
	titleBackgroundImage: ImageDto;
	date: string;
}

// ..\..\services\College.Domain\DTOs\PageDto.cs
export interface PageDto {
	id?: string;
	url: string;
	title: string;
	content: string;
	subCategoryId: string;
	template: TemplateDto;
}

// ..\..\services\College.Domain\DTOs\SubCategoryDto.cs
export interface SubCategoryDto {
	id: string;
	url: string;
	title: string;
	categoryId?: string;
	pages: PageDto[];
}

export interface TemplateDto {
	type: TemplateType;
	label: string;
	image: ImageDto;
}

export enum TemplateType {
	Default = 0,
	HeaderWithImageAndTitle = 1,
}

export interface ImageDto {
	url: string;
	alt: string | null;
}

/**
 * @summary Api error model
 */
export interface ApiError {
	requestId: string;
	reasonCode: string;
	message: string;
}

/**
 * @summary Pagination response Model
 */
export interface PaginationResponse<T> {
	data: T[];
	pageNumber: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
	hasNextPage: boolean;
}
