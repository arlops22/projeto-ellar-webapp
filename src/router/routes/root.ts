import { lazy } from 'react';

import BlankLayout from '../../components/templates/BlankLayout';

const RootRoutes = [
	{
		path: '/initial',
		component: lazy(() => import('../../pages/initial')),
		layout: BlankLayout,
		authRoute: true
	}
];

export default RootRoutes;
