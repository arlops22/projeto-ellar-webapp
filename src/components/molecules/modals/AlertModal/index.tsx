import { MouseEventHandler, ReactElement } from 'react';

import classNames from 'classnames';

import { Dialog, DialogBody } from '@material-tailwind/react';

import Button from '../../../atoms/Button';
import Icon from '../../../atoms/Icon';
import Typography from '../../../atoms/Typography';

interface IProps {
	toggle: (value: boolean)=> void,
	isOpen: boolean,
	title: string,
	description: string | ReactElement,
	className?: string,
	confirmButtonText: string,
	cancelButtonText?: string,
	onCancel?: MouseEventHandler,
	onConfirm: MouseEventHandler,
	is_loading: boolean,
	is_cancel_loading?: boolean,
	customIcon?: ReactElement,
}

const AlertModal = (props: IProps) => {
	const {
		title,
		description,
		confirmButtonText,
		cancelButtonText,
		className,
		is_loading,
		is_cancel_loading,
		onCancel,
		onConfirm,
		customIcon,
		toggle,
		isOpen
	} = props;

	return (
		<Dialog
			open={isOpen} 
			handler={toggle}
			className={classNames(
				`${ className } lg:!max-w-xs lg:!min-w-[320px] md:!max-w-xs md:!min-w-[320px] sm:!max-w-xs sm:!min-w-[320px]`,
				className
			)}
		>
			<DialogBody className='px-10 py-6'>
				<span
					className='cursor-pointer absolute top-0 right-0 mr-4 mt-4 [&>svg]:hover:fill-gray-700 transition'
					onClick={() => toggle(false)}
				>
					<Icon
						name='cross'
						size={16}
					/>
				</span>

				<div className='flex flex-col items-center justify-center gap-1'>
					{customIcon 
						? customIcon
						: (
							<Icon 
								name='fill_warning' 
								color='warning-m'
								size={40} 
							/>
						)
					}
					<Typography
						tag='p'
						variant='label-lg'
						color='gray-900'
						align='center'
					>
						{title}
					</Typography>
					<Typography
						tag={'p'}
						variant='body-sm'
						color='gray-700'
						align='center'
						className='mb-4'
					>
						{description}
					</Typography>
				</div>
				<div className='flex justify-center'>
					{onCancel && (
						<div className='mr-2'>
							<Button
								variant='outlined'
								theme='error'
								onClick={onCancel}
								size='md'
								isLoading={is_cancel_loading}
								className='w-[80px] mb-lg-0 mb-2 text-label-md'
							>
								{cancelButtonText}
							</Button>
						</div>
					)}
					<div>
						<Button
							theme='secondary'
							onClick={onConfirm}
							isLoading={is_loading}
							size='md'
							className={'w-[80px] text-label-md'}
						>
							{confirmButtonText}
						</Button>
					</div>
				</div>  
			</DialogBody>
		</Dialog>
	);
};

export default AlertModal;
