import { lazy } from 'react';

import BlankLayout from '../../components/templates/BlankLayout';

const AuthRoutes = [
	{
		path: '/auth/sign-in',
		component: lazy(() => import('../../pages/auth/sign-in')),
		layout: BlankLayout,
		authRoute: true
	}
];

export default AuthRoutes;
