import { InputHTMLAttributes, ReactElement, forwardRef } from 'react';
import InputMask from 'react-input-mask';

import classNames from 'classnames';

import { IError } from '../../../../types';

interface IProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	label?: string,
	type: 'text' | 'number' | 'e-mail' | 'password' | 'textarea' | 'date' | 'time' | 'mask',
	mask?: string,
	rightBtnAction?: ()=> void,
	rightIconComponent?: ReactElement,
	leftIconComponent?: ReactElement
	className?: string,
	supportText?: string,
	error?: IError
}

const TextInput = forwardRef<any, IProps>((props, ref) => {
	const {
		mask, rightBtnAction, rightIconComponent, error, className,
		supportText, label, type, leftIconComponent, disabled, ...fieldProps 
	} = props;

	const styles = {
		wrapper: 'flex flex-col-reverse relative',
		input: {
			base: 'w-full h-10 border border-gray-100 rounded-lg px-4 py-3 bg-white text-body-lg text-paragraph-high transition durantion-200 outline-none',
			placeholder: 'placeholder:text-body-lg placeholder:text-gray-300 placeholder:font-normal',
			filled: '',
			disabled: 'cursor-not-allowed !bg-stroke-low !text-stroke-high',
			invalid: '!border-primary-d',
			leftIcon: '!pl-10'
		},
		label: {
			base: 'text-body-lg font-medium text-paragraph-medium mb-2',
			invalid: '!text-primary-d'
		},
		support_text: {
			base: 'text-caption text-gray-700 ml-2 mt-1',
			invalid: '!text-primary-d',
		},
		left_icon: 'absolute left-3 bottom-3',
		right_icon: {
			base: 'cursor-pointer hover:opacity-70 transition absolute right-3 bottom-2 cursor-default',
			icon: 'cursor-pointer',
		}
	};

	const mask_input_props = {
		...fieldProps,
		ref,
		disabled,
		type: 'text',
		mask: mask || '',
		className: classNames(
			styles.input.base,
			styles.input.placeholder,
			{
				[styles.input.disabled]: disabled,
				[styles.input.invalid]: error !== undefined,
				[styles.input.filled]: props.value !== '',
				[styles.input.leftIcon]: leftIconComponent !== undefined
			}
		)
	};

	const input_props = {
		...fieldProps,
		ref,
		type,
		disabled,
		className: classNames(
			styles.input.base,
			{
				[styles.input.disabled]: disabled,
				[styles.input.invalid]: error !== undefined,
				[styles.input.filled]: props.value !== '',
				[styles.input.leftIcon]: leftIconComponent !== undefined,
				'min-h-[130px]': type === 'textarea'
			}
		)
	};

	const inputs: any = {
		'mask': {
			tag: InputMask,
			input_props: mask_input_props 
		},
		'textarea': {
			tag: 'textarea',
			input_props: {
				...input_props,
				rows: 4
			} 
		},
		'text': {
			tag: 'input',
			input_props 
		},
		'number': {
			tag: 'input',
			input_props 
		},
		'e-mail': {
			tag: 'input',
			input_props 
		},
		'password': {
			tag: 'input',
			input_props 
		},
		'date': {
			tag: 'input',
			input_props 
		},
		'time': {
			tag: 'input',
			input_props 
		}
	};

	const InputTag = inputs[type].tag;
	const input_tag_props = inputs[type].input_props;

	return (
		<div className={classNames('w-full', className)}>
			<div className={styles.wrapper}>
				{leftIconComponent && (
					<div className={styles.left_icon}>
						{leftIconComponent}
					</div>
				)}
				<InputTag 
					id={fieldProps.name}
					{...input_tag_props} 
				/>
				{rightIconComponent !== undefined && (
					<button
						type='button'
						onClick={() => rightBtnAction ? rightBtnAction() : null}
						className={classNames(
							styles.right_icon.base,
							{ [styles.right_icon.icon]: rightBtnAction !== undefined }
						)}
					>
						{rightIconComponent}
					</button>
				)}
				{label && (
					<label 
						className={classNames(
							styles.label.base,
							{ [styles.label.invalid]: error !== undefined }
						)} 
						htmlFor={fieldProps.name}
					>
						{label}
					</label>
				)}
			</div>

			{supportText && (
				<p className={classNames(
					styles.support_text.base,
					{ [styles.support_text.invalid]: error !== undefined }
				)}
				>
					{supportText}
				</p>
			)}
		</div>
	);
});

export default TextInput;