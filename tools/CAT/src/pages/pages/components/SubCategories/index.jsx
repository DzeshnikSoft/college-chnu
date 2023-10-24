import List from "../List"

export default function SubCategories({ title, pages }){
	return(
		<div className="h-full w-full">
			<span>{title}</span>
			<List pages={pages}/>	
		</div>
	)
}