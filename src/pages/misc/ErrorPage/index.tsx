import { useNavigate } from 'react-router-dom';

import Button from '../../../components/atoms/Button';
import Typography from '../../../components/atoms/Typography';

const Error = () => {
	const navigate = useNavigate();

	return (
		<section className='pb-xhuge'>
			<div className='w-100 text-center'>
				<Typography
					tag={'h2'}
					variant='h-base'
					className='mb-2'
					align='center'
				>
					Page Not Found 🕵🏻‍♀️
				</Typography>
				<Typography
					tag={'h2'}
					variant='base-title'
					className='mb-6'
					align='center'
				>
					Oops! 😖 The requested URL was not found on this server.
				</Typography>
				<Button 
					onClick={() => navigate('/')}
				>
					Back to Home
				</Button>
			</div>
		</section>
	);
};
export default Error;
