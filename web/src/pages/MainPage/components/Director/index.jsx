import React from 'react';

const Director = () => {
	return (
		<div className='w-full h-[400px] flex items-center xlg:h-[350px] md:h-[280px] justify-center -mt-20 lg:-mt-10 xs:-mt-5 relative z-20'>
			<div className='mx-auto flex h-full xs:h-full w-4/5 xl:w-11/12 shadow-md overflow-hidden rounded-lg'>
				<div className='h-full xs:hidden w-4/12 object-cover'>
					<img
						src='../Durector2.jpg'
						alt=''
						className='h-full w-full object-cover'
					/>
				</div>
				<div className='h-full xs:h-full xs:inline-block flex w-8/12 xs:w-full relative'>
					<img
						src='background.png'
						alt=''
						className='h-full w-full object-cover'
					/>
					<div className='absolute h-full xs:h-full top-0 flex flex-col right-0 p-5 md:p-3 md:tracking-tight text-mainTextColor text-justify'>
						<p className='text-2xl xl:text-xl xlg:text-base md:text-xs indent-8 tracking-widest font-extralight'>
							Відокремлений структурний підрозділ «Фаховий коледж
							Чернівецького національного університету імені Юрія
							Федьковича» є структурним підрозділом університету
							без статусу юридичної особи і надає освітні послуги,
							пов'язані з одержанням фахової передвищої освіти з
							одночасним наданням повної загальної середньої
							освіти.
						</p>
						<p className='text-2xl xl:text-xl xlg:text-base md:text-xs tracking-widest md:tracking-wide indent-8 font-extralight'>
							Наш заклад освіти посідає одне з провідних місць
							серед закладів фахової передвищої освіти
							Чернівецької області.
						</p>
						<p className='mb-0 mt-auto text-right text-xl xl:text-lg xlg:text-sm md:text-[10px] italic'>
							Директор, Олександр Собчук
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Director;
