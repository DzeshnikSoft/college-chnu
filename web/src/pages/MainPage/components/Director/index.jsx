import React from 'react'

const Director = () => {
  return (
    <div className= "w-full h-[400px] flex items-center justify-center -mt-20 relative z-20">
        <div className="mx-auto flex h-full w-4/5 shadow-md overflow-hidden rounded-lg">
			<div className="h-full w-4/12 object-cover">
				<img 
					src="../Durector2.jpg" 
					alt="" 
					className='h-full w-full object-cover'
				/>
			</div>
			<div className="h-full flex w-8/12 relative">
				<img 
					src="https://i.ibb.co/1mmrSb6/WP-20191109-15-54-00-Pro-1.png" 
					alt="" 
					className='h-full w-full object-cover'
				/>
					<div className="absolute h-full top-0 flex flex-col right-0 p-5 text-mainTextColor text-justify">
						<p className='text-2xl indent-8 tracking-widest font-extralight'>Відокремлений структурний підрозділ «Фаховий коледж Чернівецького національного університету 
						імені Юрія Федьковича» є структурним підрозділом університету без статусу юридичної особи і 
						надає освітні послуги, пов'язані з одержанням фахової передвищої освіти з одночасним наданням повної 
						загальної середньої освіти.</p>
						<p className='text-2xl tracking-widest indent-8 font-extralight'>Наш заклад освіти посідає одне з провідних місць серед закладів 
						фахової передвищої освіти Чернівецької області.</p>
						<p className="mb-0 mt-auto text-right text-xl italic">Директор, Олександр Собчук</p>
					</div> 
						
				</div>
			</div>
        </div>
  )
}

export default Director;