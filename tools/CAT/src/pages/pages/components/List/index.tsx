import ListItem from "../ListItem";
import AddButton from "@/components/AddButton";
export default function List({ pages }) {
	return (
		<ul className='border flex flex-col overflow-hidden rounded-sm'>
			{pages.map(({ title }) => (
				<ListItem> {title} </ListItem>
			))}
			<AddButton />
		</ul>
	);
}
