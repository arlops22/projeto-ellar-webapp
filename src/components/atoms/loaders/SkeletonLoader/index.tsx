import classNames from 'classnames';

interface IProps {
	width: number | string
	height: number | string
	className?: string
}

const SkeletonLoader = (props: IProps) => {
	const { 
		className, 
		width = 200,
		height = 70
	} = props;

	return (
		<div 
			style={{ width, height }} 
			className={classNames(
				'animate-pulse',
				'bg-gray-200',
				className
			)} 
		/>
	);
};

export default SkeletonLoader;