import { LayoutProps } from '../../../types';

const BlankLayout = ({ children }: LayoutProps) => {
	return (
		<div className='flex flex-column items-center justify-center h-screen'>
			{children}
		</div>
	);
};

export default BlankLayout;