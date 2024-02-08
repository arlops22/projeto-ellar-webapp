import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { DefaultRoute, AppRoutes } from './routes';
import { isAuthenticaded } from '../utils/helper';

import BlankLayout from '../components/templates/BlankLayout';
const Unauthorized = lazy(() => import('../pages/misc/UnauthorizedPage'));
const Error = lazy(() => import('../pages/misc/ErrorPage'));

const Router = () => {
	
	const FinalRoute = (props: any) => {
		const route = props.route;

		if (route.authRoute && isAuthenticaded()) {
			// Se for uma rota de autenticação e o usuário já estiver autenticado, redirecionar para a página inicial
			return <Navigate to='/' replace />;
		} else if (!route.authRoute && !route.publicRoute && !isAuthenticaded()) {
			// Se o usuário não estiver autenticado e a rota não for de autenticação, redirecionar para a página de login
			return <Navigate to='/auth/sign-in' replace />;
		} else {
			return <route.component {...props} exact={true} />;
		}
	};

	const ResolveRoutes = () => (
		AppRoutes.map(route => (
			<Route
				key={route.path}
				path={route.path}
				element={
					<route.layout>
						<Suspense fallback={null}>
							<FinalRoute route={route} />
						</Suspense>
					</route.layout>
				}
			/>
		))
	);

	return (
		<BrowserRouter 
			// basename={process.env.REACT_APP_BASENAM E}
		>
			<Routes>
				<Route
					path='/'
					element={
						isAuthenticaded() 
							? <Navigate to={DefaultRoute} replace /> 
							: <Navigate to='/auth/sign-in' replace />
					}
				/>
				<Route
					path='/misc/not-authorized'
					element={
						<BlankLayout>
							<Unauthorized />
						</BlankLayout>
					}
				/>
				{ResolveRoutes()}
				<Route 
					path='*' 
					element={
						<BlankLayout>
							<Error />
						</BlankLayout>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
