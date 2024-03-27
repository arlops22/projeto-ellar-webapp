import { ChangeEvent } from 'react';

import { IValidationParams } from '../types';

export const onChange = (setValues: Function, event: ChangeEvent<HTMLInputElement>) => {
	setValues((oldValues: any) => ({ ...oldValues, [event.target.name]: event.target.value }));
};

export const onChangeHandleErrors = (setValues: Function, setErrors: Function, event: ChangeEvent<HTMLInputElement>) => {
	setValues((oldValues: any) => ({ ...oldValues, [event.target.name]: event.target.value }));
	setErrors((oldErrors: any) => {
		delete oldErrors[event.target.name];

		return oldErrors;
	});
};

export const isAuthenticaded = () => {
	return localStorage.getItem('token') !== null;
};

const singleFieldValidation = (schema: any, field: any) => {
	const field_path = Object.keys(field);
	const data = schema.validateSync(field_path[0], field);
	return { data };
};

const formValidation = (schema: any, values: any) => {
	const data = schema.validateSync(values, { abortEarly: false });
	return { data };
};

export const resolveValidation = (params: IValidationParams) => {
	const { mode, schema, fields } = params;
  
	try {
		if (mode === 'singleField') {
			return singleFieldValidation(schema, fields);
		}
		if (mode === 'formFields') {
			return formValidation(schema, fields);
		}
	} catch(error: any) {
		if (!error.inner) {
			throw error;
		}
		return { error };
	}
};

export const resolveErrors = (setErrors: Function, errors: any) => {
	let new_errors: any = {};
	errors.forEach((error: any) => {
		new_errors[error.path] = { message: error.message };
	});

	setErrors(new_errors);
	window.scrollTo(0, 0);
};