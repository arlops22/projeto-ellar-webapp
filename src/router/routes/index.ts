// ** Routes Imports
import RootRoutes from './root';
import AuthRoutes from './auth';

// ** Default Route
const DefaultRoute = '/admin/initial';

// ** Merge Routes
const AppRoutes = [ 
	...AuthRoutes,
	...RootRoutes
];

export { DefaultRoute, AppRoutes };
