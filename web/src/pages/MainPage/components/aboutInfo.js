import React from 'react';
import './aboutInfo.css';

const AboutInfo = () => {
	return (
		<div className='aboutInfo mt-5'>
			<div className='container'>
				<div className='preview'>
					<h1>Ласкаво просимо до нашого коледжу</h1>
				</div>
				<div className='info'>
					<p className='AboutInfoP2'>
						Говорячи про освіту загалом, хочеться згадати слова
						американського письменника і викладача Роберта Тору
						Кіосакі:
						<span>
							{' '}
							"Освіта, яка не вчить жити успішно в сучасному
							світі, не має ніякої цінності. Кожен із нас
							приходить у життя з природженою здатністю жити
							щасливо й успішно. А ми повинні збагатити цю
							здатність знаннями і навичками, які допомогли б нам
							реалізувати її якомога ефективніше"
						</span>
						.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutInfo;
