export const convertCategoryDataToPositionNavMenuItemsModel = (inputData) => {
	let outputData = [];

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
				transformedSubCategory.pages.push({
					pageId: page.id,
				});
			});

			transformedCategory.subCategories.push(transformedSubCategory);
		});

		outputData.push(transformedCategory);
	});

	return outputData;
};
