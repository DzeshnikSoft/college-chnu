import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Page from "./components/Page";
import DialogCreateCategory from "./components/DialogCreateCategory";
import { useGetCategoriesQuery } from "@/store/apis/categories";
import { useState } from "react";
import { defaultUrl } from "@/utils/defaultUrl";
import AddButton from "@/components/AddButton";
import { CategoryDto } from "@/models/api";
import DeleteButton from "@/components/DeleteButton";
import SpinnerWrapper from "@/components/Spinner";
const Pages = () => {
	const [isOpenPopupForCategoties, setIsOpenPopupForCategoties] =
		useState<boolean>(false);
	const { data, isFetching } = useGetCategoriesQuery(undefined, {});

	const handleClickOnAddButton = () => {
		setIsOpenPopupForCategoties(true);
	};
	const handleClosePopupCategoties = () => {
		setIsOpenPopupForCategoties(false);
	};

	return (
		<div className='h-full w-full'>
			{!isFetching ? (
				<Tabs isFitted>
					<TabList>
						{(data as CategoryDto[])?.map(
							({ title }: CategoryDto) => (
								<Tab>{title}</Tab>
							)
						)}
						<AddButton
							className='text-md h-full'
							onClick={handleClickOnAddButton}>
							Нова категорія
						</AddButton>
					</TabList>
					<TabPanels>
						{(data as CategoryDto[])?.map(
							({
								title,
								subCategories,
								id,
								url,
							}: CategoryDto) => (
								<TabPanel>
									<Page
										title={title}
										id={id}
										url={url}
										subCategories={subCategories}
									/>
								</TabPanel>
							)
						)}
					</TabPanels>
				</Tabs>
			) : (
				<SpinnerWrapper />
			)}

			{isOpenPopupForCategoties && (
				<DialogCreateCategory
					handleClose={handleClosePopupCategoties}
					parentUrl={defaultUrl}
				/>
			)}
		</div>
	);
};

export default Pages;
