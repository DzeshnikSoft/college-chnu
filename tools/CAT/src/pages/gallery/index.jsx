import { useState } from 'react';
import {
	Select,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverBody,
	Button,
	Portal,
	PopoverArrow,
	PopoverHeader,
	PopoverCloseButton,
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import AddButton from '../../components/AddButton';
import IconPanel from '../news/components/IconPanel';
import DialogAddImage from './components/DialogAddImage';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import TextField from '../../components/TextField';

function Gallery() {
	const [isOpenDialogAddImage, setIsOpenDialogAddImage] = useState(false);
	const closeDialog = () => {
		setIsOpenDialogAddImage(false);
	};

	const openDialog = () => {
		setIsOpenDialogAddImage(true);
	};

	return (
		<div className='h-relativelyHeaderFullScreen w-full flex flex-col'>
			{isOpenDialogAddImage && (
				<DialogAddImage handleClose={closeDialog} />
			)}
			<div className='w-10/12 h-full flex flex-col m-auto'>
				<div className='w-full mx-auto h-1/6 flex justify-between items-center'>
					<AddButton className='!mx-0' onClick={openDialog}>
						Додати фото
					</AddButton>
					<div className='flex'>
						<Popover>
							<PopoverTrigger>
								<Button colorScheme='red' className='mr-6'>
									Видалити рік
								</Button>
							</PopoverTrigger>
							<Portal>
								<PopoverContent>
									<PopoverArrow />
									<PopoverHeader>
										Введіть рік для видалення
									</PopoverHeader>
									<PopoverCloseButton />
									<PopoverBody className='flex flex-col gap-5'>
										<TextField type='number' />
										<Button>Підтвердити</Button>
									</PopoverBody>
								</PopoverContent>
							</Portal>
						</Popover>
						<Popover>
							<PopoverTrigger>
								<Button colorScheme='green' className='mr-6'>
									Додати новий рік
								</Button>
							</PopoverTrigger>
							<Portal>
								<PopoverContent>
									<PopoverArrow />
									<PopoverHeader>
										Введіть новий рік
									</PopoverHeader>
									<PopoverCloseButton />
									<PopoverBody className='flex flex-col gap-5'>
										<TextField type='number' />
										<Button>Підтвердити</Button>
									</PopoverBody>
								</PopoverContent>
							</Portal>
						</Popover>
						<div className='!w-40'>
							<Select variant='filled'>
								<option value='2021'>2021</option>
								<option value='2022'>2022</option>
								<option value='2023'>2023</option>
								<option selected value='2024'>
									2024
								</option>
							</Select>
						</div>
					</div>
				</div>
				<div className='w-full flex'>
					<div className='h-4/6 w-9/12 flex'>
						<Carousel className='h-full' showArrows={true}>
							<div className='relative'>
								<img
									className='h-full w-full object-contain'
									src='https://picsum.photos/id/1018/1000/600/'
								/>
								<div className='absolute top-7 right-5'>
									<IconPanel
										classNameIcon='fa-solid fa-trash'
										className='hover:bg-[#e53e3e] rounded-md cursor-pointer p-1 bg-[#e53e3e]'>
										Видалити
									</IconPanel>
								</div>
								<div className='absolute rounded-md top-7 left-5'>
									<IconPanel
										classNameIcon='fa-solid fa-pencil'
										className='hover:bg-[#38a169] rounded-md cursor-pointer p-1 bg-[#38a169]'>
										Замінити
									</IconPanel>
								</div>
							</div>
							<div>
								<img src='https://picsum.photos/id/1018/1000/600/' />
								<p className='legend'>Legend 2</p>
							</div>
							<div>
								<img src='https://picsum.photos/id/1018/1000/600/' />
								<p className='legend'>Legend 3</p>
							</div>
							<div>
								<img src='https://picsum.photos/id/1018/1000/600/' />
								<p className='legend'>Legend 4</p>
							</div>
							<div>
								<img src='https://picsum.photos/id/1018/1000/600/' />
								<p className='legend'>Legend 5</p>
							</div>
							<div>
								<img src='https://picsum.photos/id/1018/1000/600/' />
								<p className='legend'>Legend 6</p>
							</div>
						</Carousel>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Gallery;
