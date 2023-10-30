import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { pagesItems } from "@/utils/pagesItems";
import Page from "./components/Page";
import DialogCreateCategory from "./components/DialogCreateCategory";
import { useGetCategoriesQuery } from "@/store/api/categories";
import { useState } from "react";
import AddButton from "@/components/AddButton";

const Pages = () => {
	const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
	const { data, loading } = useGetCategoriesQuery();

	const handleClickOnAddButton = () => {
		setIsOpenPopup(true);
	};
	const handleClose = () => {
		setIsOpenPopup(false);
	};

	return (
		<div className='h-full w-full'>
			<Tabs isFitted variant='enclosed'>
				<TabList mb='1em'>
					{data?.map(({ title }) => (
						<Tab>{title}</Tab>
					))}
					<AddButton onClick={handleClickOnAddButton} />
				</TabList>
				<TabPanels>
					{data?.map(({ title, subCategories, id, url }) => (
						<TabPanel>
							<Page
								title={title}
								id={id}
								url={url}
								subCategories={subCategories}
							/>
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
			{isOpenPopup && (
				<DialogCreateCategory handleClose={handleClose} data={data} />
			)}
		</div>
	);
};

export default Pages;
