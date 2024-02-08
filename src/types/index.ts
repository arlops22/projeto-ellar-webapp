import { ReactNode } from 'react';

export interface LayoutProps {
	children: ReactNode,
	routerProps?: any,
	currentActiveItem?: string
}