import { useState } from 'react';
import ItemWrapper from './ItemWrapper';
import PartItemText from './PartItemText';
interface SelectTemplates {
	selectedType: number;
}

export default function SelectTemplates({ selectedType }) {
	const [selectedTypeState, setSelectedTypeState] =
		useState<number>(selectedType);

	const handleChangeType = (value: number) => {
		setSelectedTypeState(value);
	};

	return (
		<div className='h-fit flex gap-8 mb-20 justify-center w-full'>
			<ItemWrapper
				selectedTypeState={selectedTypeState}
				handleChangeType={handleChangeType}
				type={1}>
				<PartItemText className='!h-2/6 w-full text-white bg-hoverActiveItems'>
					Заголовок
				</PartItemText>
				<PartItemText>Редактор</PartItemText>
			</ItemWrapper>
			<ItemWrapper
				selectedTypeState={selectedTypeState}
				handleChangeType={handleChangeType}
				type={0}>
				<PartItemText>Редактор</PartItemText>
			</ItemWrapper>
		</div>
	);
}
