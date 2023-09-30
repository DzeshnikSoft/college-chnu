import React, { useEffect, useState } from "react";
import "./newsAndOther.css";
import { Link } from "react-router-dom";
import NewsService from "../../Services/NewsService";
import { ParseDate } from "../../Services/Helpers";

const NewsAndOther = () => {
	const service = new NewsService();
	const [news, setNews] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await service.getAllNews();
			console.log(res.data);
			setNews(res.data);
		})();
	}, []);

	return <div></div>;
};

export default NewsAndOther;
