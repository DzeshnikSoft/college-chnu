export const MENU_ITEMS = [
	{
		path:"/",
		name:"Головна",
		subMenu:[]
	},
	{
		path:"/history",
		name:"Історія",
		subMenu:[
			{
				path:"/history/college",
				name:"Коледжу",
			},
			{
				path:"/history/university",
				name:"Університету",
			}
		]
	},
	{
		path:"/speciality",
		name:"Спеціальності",
		subMenu:[
			{
				path:"/speciality/jurisprudence",
				name:"Право",
			},
			{
				path:"/speciality/business-trade",
				name:"Підприємство та торгівля",
			},
			{
				path:"/speciality/finance-banking",
				name:"Фінанси, банк. спр,",
			},
			{
				path:"/speciality/accounting-taxation",
				name:"Облік та оподаткування",
			},
			{
				path:"/speciality/applied-math",
				name:"Прикладна математика",
			},
			{
				path:"/speciality/computer-science",
				name:"Комп`ютерні науки",
			},
			{
				path:"/speciality/computer-engineering",
				name:"Комп`ютерна інженерія",
			},
		]
	},
	{
		path:"/student",
		name:"Студенту",
		subMenu:[]
	},
	{
		path:"/entrant",
		name:"Абітурієнту",
		subMenu:[]
	},
	{
		path:"/administration",
		name:"Адміністація",
		subMenu:[]
	},
]