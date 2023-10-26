import { ReactNode, useState } from 'react';

import CloseButton from '@/components/CloseButton';

interface ListItemProps {
    children?: ReactNode;
}

export default function ListItem({ children }: ListItemProps) {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <li
            className='p-2 cursor-pointer relative border-b last:border-b-0 hover:bg-activeItems'
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            {children}
            {isHovering === true && (
                <CloseButton className=' p-0 h-fit top-1/2 right-0 w-fit absolute transform -translate-x-1/2 -translate-y-1/2' />
            )}
        </li>
    );
}
