import { CategoryDto } from "@/models/api";

export const pagesItems: CategoryDto[] = [
	{
		id: "1",
		url: "https://example.com/category1",
		title: "Category 1",
		subCategories: [
			{
				id: "1",
				url: "https://example.com/category1/subcategory1",
				title: "Subcategory 11",
				pages: [
					{
						id: "1",
						url: "https://example.com/category1/subcategory1/page1",
						title: "Page 11",
						content: "Content of page 1",
					},
					{
						id: "2",
						url: "https://example.com/category1/subcategory1/page2",
						title: "Page 12",
						content: "Content of page 2",
					},
				],
			},
			{
				id: "2",
				url: "https://example.com/category1/subcategory2",
				title: "Subcategory 21",
				pages: [
					{
						id: "1",
						url: "https://example.com/category1/subcategory2/page1",
						title: "Page 11",
						content: "Content of page 1",
					},
					{
						id: "2",
						url: "https://example.com/category1/subcategory2/page2",
						title: "Page 12",
						content: "Content of page 2",
					},
				],
			},
		],
	},
	{
		id: "2",
		url: "https://example.com/category2",
		title: "Category 2",
		subCategories: [
			{
				id: "1",
				url: "https://example.com/category2/subcategory1",
				title: "Subcategory 21",
				pages: [
					{
						id: "1",
						url: "https://example.com/category2/subcategory1/page1",
						title: "Page 21",
						content: "Content of page 1",
					},
					{
						id: "2",
						url: "https://example.com/category2/subcategory1/page2",
						title: "Page 22",
						content: "Content of page 2",
					},
				],
			},
			{
				id: "2",
				url: "https://example.com/category2/subcategory2",
				title: "Subcategory 22",
				pages: [
					{
						id: "1",
						url: "https://example.com/category2/subcategory2/page1",
						title: "Page 21",
						content: "Content of page 1",
					},
					{
						id: "2",
						url: "https://example.com/category2/subcategory2/page2",
						title: "Page 22",
						content: "Content of page 2",
					},
				],
			},
		],
	},
];
