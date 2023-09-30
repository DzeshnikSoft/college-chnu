export interface NavLink {
	icon: string;
	label: string;
	path: string;
}

export const navLinks: NavLink[] = [
	{
		icon: 'fas fa-newspaper',
		label: 'Новини',
		path: '/news',
	},
	{
		icon: 'fas fa-pager',
		label: 'Сторінки',
		path: '/pages',
	},
	{
		icon: 'fa-solid fa-gear',
		label: 'Налаштування',
		path: '/settings',
	},
];
