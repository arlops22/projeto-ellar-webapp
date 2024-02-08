import { useNavigate } from 'react-router-dom';

import Button from '../../../components/atoms/Button';

const Unauthorized = () => {
	const navigate = useNavigate();

	return (
		<section className='pb-xhuge'>
			<div className='w-100 text-center'>
				<h2 className='mb-2 heading-md'>You are not authorized! 🔐</h2>
				<p className='mb-6 body-lg'>
          The Webtrends Marketing Lab website in IIS uses the default IUSR account credentials to access the web pages
          it serves.
				</p>
				<Button onClick={() => navigate('/')}>Back to Home</Button>
			</div>
		</section>
	);
};
export default Unauthorized;
