import React from "react";
import { NavLink } from "react-router-dom";
import { TEST_NEWS } from "../../../../utils/constants";

export default function NewsMainPage() {

	const truncate = (text) => {
		return text.substring(0, 120) + '...'; 
	}
	
	return(
		<div className="h-[600px] flex w-full mt-5">
			<div className="w-4/5 mx-auto">
				<div className="w-full flex">
					<span className="text-colorTextColor text-4xl mr-3 font-medium">Новини</span>
					<div className="h-[2px] bg-backgroundBorder rounded-2xl w-full my-auto"></div>
				</div>
				<div className="w-full">
					<NavLink to="/all-news">
						<p className="text-accentTextColor text-xl mt-3 underline">Всі новини</p>
					</NavLink>
				</div>
				<div className="w-full h-full flex mt-3">
					<div className="w-1/2 h-full flex justify-between">
						<div className="w-9/12 h-full">
							<div className="w-full h-3/6 rounded-2xl overflow-hidden border">
								<img 
									src="http://college-chnu.cv.ua/pages/files/cb9d1cf0b4e0/unnamed.jpg" 
									alt=""
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="">
								<p className="text-lg mt-2 text-[#999999]">Жовтень 1, 2023</p>
								<p className="text-colorTextColor font-semibold text-justify mt-3 text-lg">
									{truncate(`З 18 вересня 2023 р. ВСП "Фаховий коледж ЧНУ" 
									розпочинає прийом документів на ПІДГОТОВЧІ КУРСИ`)}
									<NavLink to="/">
									<span className="ml-2 text-accentTextColor hover:underline">
										Детальніше	
									</span>
									</NavLink>
								</p>
							</div>
						</div>
					</div>
					<div className="w-1/2 h-full flex flex-col gap-5">
						{
							TEST_NEWS.map((item)=>(
								<div className="w-full h-[130px] flex gap-3">
									<div className="w-4/12 h-full rounded-2xl overflow-hidden border">
										<img 
											src={item.image}
											alt=""
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="w-8/12">
										<p className="text-sm mt-2 text-[#999999]">{item.date}</p>
										<p className="text-colorTextColor w-full overflow-hidden font-semibold text-justify mt-3 text-base">
											{truncate(item.description)}
											<NavLink to="/">
												<span className="ml-2 text-accentTextColor hover:underline">
													Детальніше	
												</span>
											</NavLink>
										</p>
									</div>
								</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}