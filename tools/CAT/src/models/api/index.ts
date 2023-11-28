// ..\..\services\College.Domain\DTOs\CategoryDto.cs
export interface CategoryDto {
	id: string;
	url: string;
	title: string;
	subCategories: SubCategoryDto[];
}

// ..\..\services\College.Domain\DTOs\NewsDto.cs
export interface NewsDto {
	id: string;
	title: string;
	mainImage: string;
	description: string;
	content: string;
	pinned?: boolean;
	date: string;
}

// ..\..\services\College.Domain\DTOs\PageDto.cs
export interface PageDto {
	id: string;
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
