import ListItem from "../ListItem";
import AddButton from "@/components/AddButton";

import { PageDto } from "@/models/api";
interface List {
	pages: PageDto[];
}

export default function List({ pages }: List) {
	const handleClick = () => {};
	return (
		<ul className='border flex flex-col overflow-hidden rounded-md'>
			{pages.map(({ title }) => (
				<ListItem> {title} </ListItem>
			))}
			<AddButton onClick={handleClick} />
		</ul>
	);
}
