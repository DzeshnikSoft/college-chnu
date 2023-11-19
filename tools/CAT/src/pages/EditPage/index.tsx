import EditPageDefault from "./EditPageDefault";
import EditPageWithTitle from "./EditPageWithTitle";
import Edit from "@/components/Edit";
import Dialog from "@/components/Dialog";
import UploadFileWrapper from "@/components/UploadFileWrapper";
import SpinnerWrapper from "@/components/Spinner";

interface EditPageProps {
	handleClose: () => void;
	parentUrl: string;
	templateType: string;
	loading: boolean;
}

export default function EditPage({
	handleClose,
	parentUrl,
	templateType,
	loading,
}: EditPageProps) {
	const handleChangeTitle = () => {};

	const handleChangeUrlPage = () => {};

	const selectTemplate = (templateType) => {
		switch (templateType) {
			case "default":
				return <EditPageDefault />;
			case "withTitle":
				return <EditPageWithTitle />;
			default:
				return <></>;
		}
	};

	return (
		<Dialog
			onClick={handleClose}
			className='w-full h-full overflow-y-auto flex-col !p-0 rounded-none'>
			{loading ? (
				<SpinnerWrapper />
			) : (
				<>
					<div className='flex flex-col'>
						<div className='flex mt-3'>
							<div className='w-5/12 mx-10'>
								<Edit
									value=''
									name='Назва'
									type='text'
									onChange={handleChangeTitle}
								/>
							</div>
							<div className='w-5/12'>
								<Edit
									value=''
									name={parentUrl}
									type='link'
									onChange={handleChangeUrlPage}
								/>
							</div>
						</div>
						<div className='ml-10 my-5 flex'>
							<UploadFileWrapper />
						</div>
					</div>
					<div className='w-full mx-auto'>
						{selectTemplate(templateType)}
					</div>
				</>
			)}
		</Dialog>
	);
}
