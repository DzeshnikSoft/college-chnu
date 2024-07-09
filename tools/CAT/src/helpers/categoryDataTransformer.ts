import { CategoryOrdering } from '@/models/categories';

export const convertCategoryDataToPositionNavMenuItemsModel = (inputData) => {
	const outputData: CategoryOrdering[] = [];

	inputData.forEach((category) => {
		let transformedCategory = {
			categoryId: category.id,
			subCategories: [],
		};

		category.subCategories.forEach((subCategory) => {
			let transformedSubCategory = {
				subCategoryId: subCategory.id,
				pages: [],
			};

			subCategory.pages.forEach((page) => {
				transformedSubCategory.pages.push(page.id);
			});

			transformedCategory.subCategories.push(transformedSubCategory);
		});

		outputData.push(transformedCategory);
	});

	return outputData;
};
