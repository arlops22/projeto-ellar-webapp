import { ReactNode } from 'react';
import { TypeOptions } from 'react-toastify';

import { svg_object } from '../components/atoms/Icon';
import { Tokens } from '../utils';

export interface LayoutProps {
	children: ReactNode,
	routerProps?: any,
	currentActiveItem?: string
}

export interface IValidationParams {
	schema: Record<string, any>, 
	mode: 'singleField' | 'formFields', 
	fields: Record<string, any>
}

export interface IError {
	message?: string
}

export interface IToastProps {
	label: string;
	message: string;
	icon?: TypeOptions;
	type: TypeOptions;
	toastId?: string;
	autoClose?: number | false;
}


export type TColor = keyof typeof Tokens.colors | 'white' | 'black';

export type TFontSize = keyof typeof Tokens.fontSize;

export type TIconName = keyof typeof svg_object;