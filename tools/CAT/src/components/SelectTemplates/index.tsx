import { useState } from "react";
import ItemWrapper from "./ItemWrapper";
import PartItemText from "./PartItemText";
interface SelectTemplates {
	handleChangeTemplateType: () => void;
	selectedType: string;
}
export default function SelectTemplates({
	handleChangeTemplateType,
	selectedType,
}) {
	return (
		<div className='h-fit flex gap-8 mb-20 justify-center w-full'>
			<ItemWrapper
				type='withTitle'
				selectedType={selectedType}
				handleChangeTemplateType={handleChangeTemplateType}>
				<PartItemText className='!h-2/6 w-full text-white bg-hoverActiveItems'>
					Заголовок
				</PartItemText>
				<PartItemText>Редактор</PartItemText>
			</ItemWrapper>
			<ItemWrapper
				type='default'
				selectedType={selectedType}
				handleChangeTemplateType={handleChangeTemplateType}>
				<PartItemText>Редактор</PartItemText>
			</ItemWrapper>
		</div>
	);
}
