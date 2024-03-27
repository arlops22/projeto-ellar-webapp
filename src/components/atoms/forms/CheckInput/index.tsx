import { ChangeEventHandler, forwardRef, InputHTMLAttributes, ReactElement } from 'react';

import classNames from 'classnames';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string | ReactElement
	id?: string,
	name?: string,
	value: string,
	type: 'checkbox' | 'switch' | 'radio',
	onChange?: ChangeEventHandler,
	disabled?: boolean,
	invalid?: boolean,
	className?: string,
	checked?: boolean
}

const CheckInput = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const { 
		label, 
		invalid, 
		disabled,
		className, 
		type, 
		...fieldProps 
	} = props;

	const styles = {
		container: 'flex items-center relative',
		inputs: {
			radio: {
				base: 'w-4 h-4 rounded-full border border-ggray-300 bg-white appearance-none cursor-pointer transition relative',
				before: 'before:content[""] before:block before:bg-primary-m before:w-0 before:h-0 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 before:transition-all',
				checked: 'checked:border-primary-m checked:before:opacity-100 checked:before:w-2 checked:before:h-2',
				invalid: '!border-error-m before:bg-error-m',
				disabled: '!cursor-not-allowed !border-gray-100 before:bg-gray-100'
			},
			checkbox: {
				base: 'w-4 h-4 rounded border border-ggray-300 bg-white bg-check bg-center bg-[length:20px_20px] appearance-none cursor-pointer transition',
				before: '',
				checked: 'checked:border-primary-m checked:bg-primary-m',
				invalid: '!border-error-m checked:!bg-error-m',
				disabled: '!cursor-not-allowed !border-gray-100 checked:!bg-gray-100'
			},
			switch: {
				base: 'w-8 h-4 rounded-full border border-ggray-300 bg-ggray-300 relative appearance-none cursor-pointer transition',
				before: 'before:content[""] before:block before:cursor-pointer before:bg-white before:border before:border-ggray-300 before:w-5 before:h-5 before:rounded-full before:absolute before:-left-1 before:top-2/4 before:-translate-y-2/4 before:transition',
				checked: 'checked:bg-primary-m checked:border-primary-m checked:before:translate-x-full checked:before:border-primary-m',
				invalid: '!border-error-m !bg-error-m/[0.12] before:border-error-m checked:before:border-error-m',
				disabled: '!cursor-not-allowed before:!cursor-not-allowed !border-gray-100 !bg-gray-100/[0.12] before:border-gray-100 checked:before:border-gray-100'
			}
		},
		label: {
			base: 'text-body-md text-gray-900 font-medium leading-4 ml-2 cursor-pointer',
			invalid: '!text-error-m',
			disabled: '!cursor-not-allowed'
		}
	};

	const input_props = {
		...fieldProps,
		type: type === 'switch' ? 'checkbox' : type,
		disabled,
		className: classNames(
			styles.inputs[type].base,
			styles.inputs[type].checked,
			styles.inputs[type].before,
			{
				[styles.inputs[type].invalid]: invalid,
				[styles.inputs[type].disabled]: disabled
			}
		),
		ref
	};

	return (
		<>
			<div className={classNames(
				styles.container,
				className
			)}>
				<input {...input_props} />
				{label && (
					<label 
						className={classNames(
							styles.label.base,
							{
								[styles.label.invalid]: invalid,
								[styles.label.disabled]: disabled
							}
						)}
						htmlFor={fieldProps.id}
					>
						{label}
					</label>
				)}
			</div>
		</>
	);
}); 

export default CheckInput;