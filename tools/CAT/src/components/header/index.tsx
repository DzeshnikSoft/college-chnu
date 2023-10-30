import { useSelector } from "react-redux";

import { selectUser } from "@/store/features/user.feature";
import {
	Avatar,
	Flex,
	IconButton,
	SkeletonCircle,
	SkeletonText,
	Text,
} from "@chakra-ui/react";

const Header = () => {
	return (
		<Flex
			className='border h-[8vh]'
			alignItems={"center"}
			px={2}
			justify={"space-between"}>
			{/* <Flex alignItems={"center"} w={80}>
				<SkeletonCircle size='12' isLoaded={}>
					<Avatar size={"md"} src={ ""} />
				</SkeletonCircle>
				<SkeletonText
					noOfLines={1}
					ml={4}
					skeletonHeight='8'
					width={500}
					isLoaded={}>
					<Text fontSize={"2xl"}></Text>
				</SkeletonText>
			</Flex>
			<IconButton
				aria-label={"Logout"}
				colorScheme='red'
				icon={<i className='fa-solid fa-right-from-bracket'></i>}
			/> */}
		</Flex>
	);
};

export default Header;
