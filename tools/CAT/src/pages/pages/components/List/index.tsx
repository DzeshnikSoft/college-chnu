import AddButton from '@/components/AddButton';
import { PageDto } from '@/models/api';

import ListItem from '../ListItem';

interface ListProps {
    pages: PageDto[];
}

export default function List({ pages }: ListProps) {
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
