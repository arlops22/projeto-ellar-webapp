import { ChangeEvent } from 'react';

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
}