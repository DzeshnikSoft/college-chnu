import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddButton from '@/components/AddButton';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SpinnerWrapper from '@/components/Spinner';
import PersonalCard from './components/PersonalCard';
import AddNewPerson from './components/addNewPerson';
import { MemberCollectiveCollegeDto } from '@/models/api';

function CollectiveCollege() {
	const [isOpenAddNewPersonDialog, setIsOpenAddNewPersonDialog] =
		useState<boolean>(false);

	const closeAddNewPersonDialog = () => {
		setIsOpenAddNewPersonDialog(false);
	};

	const openAddNewPersonDialog = () => {
		setIsOpenAddNewPersonDialog(true);
	};

	return (
		<div className='w-full h-full flex flex-col'>
			{isOpenAddNewPersonDialog && (
				<AddNewPerson handleClose={closeAddNewPersonDialog} />
			)}
			<div className='w-11/12 h-full mx-auto flex flex-col'>
				<div className='w-full h-1/6 flex items-center justify-between'>
					<AddButton
						onClick={openAddNewPersonDialog}
						className='!mx-0'>
						Додати співробітника
					</AddButton>

					<div className='!w-5/12'>
						<InputGroup>
							<InputLeftElement>
								<SearchIcon />
							</InputLeftElement>
							<Input
								//onChange={handleSearch}
								placeholder='Знайти співробітника'
								//value={searchText}
							/>
						</InputGroup>
					</div>
				</div>
				<div className='h-5/6 flex flex-col justify-between'>
					{false ? (
						<SpinnerWrapper />
					) : (
						<>
							<div className='w-full h-5/6 grid grid-cols-2 gap-y-12 gap-x-5'>
								<PersonalCard
									image='Durector2.jpg'
									description='Собчук Олександр Васильович кандидат фізико-математичних
													наук, доцент викладач вищої категорії, методист'
									posada='Директор'
								/>
								<PersonalCard
									image='kovdrushVV.jpeg'
									posada='Завідувач
										природничого відділення'
									description='Ковдриш Володимир Володимирович
										кандидат фізико-математичних наук,
										викладач вищої категорії'
								/>
								<PersonalCard
									image='derevyanchukMYA.jpeg'
									posada='Заступник директора
											з навчально-методичної роботи'
									description="Дерев'янчук Микола Ярославович
												викладач вищої категорії, методист"
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default CollectiveCollege;
