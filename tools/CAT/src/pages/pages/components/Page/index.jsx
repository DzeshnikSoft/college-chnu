import SubCategories from "../SubCategories"
import Button from "../../../../components/Button"
import AddButton from "../../../../components/AddButton"
import CloseButton from "../../../../components/CloseButton"
export default function Page({title, subCategories }){
	return(
		<div className="w-full flex flex-col h-full ">
			<div className="w-full flex mb-10">
				<div className="">
					<input 
						type="text" 
						value={title} 
						className="border ml-20 mr-3 rounded-sm text-xl p-2"
					/>
					<Button className="hover:bg-hoverActiveItems hover:text-white">Зберегти</Button>
				</div>
				<CloseButton className="ml-auto mr-20"/>
			</div>
			<div className="grid grid-cols-3 gap-10 w-10/12 mx-auto place-items-center">
				{subCategories.map(({title, pages}) => (
					<SubCategories pages={pages} title={title}/>
				))}
				<AddButton />
			</div>
		</div>
	)
}