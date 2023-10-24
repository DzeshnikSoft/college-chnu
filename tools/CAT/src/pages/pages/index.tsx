import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { pagesItems } from "@/utils/pagesItems";
import Page from "../pages/components/Page";

const Pages = () => {
	return (
		<div className='h-full w-full'>
			<Tabs isFitted variant='enclosed'>
				<TabList mb='1em'>
					{pagesItems.map(({ title }) => (
						<Tab>{title}</Tab>
					))}
				</TabList>
				<TabPanels>
					{pagesItems.map(({ title, subCategories }) => (
						<TabPanel>
							<Page title={title} subCategories={subCategories} />
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</div>
	);
};

export default Pages;
