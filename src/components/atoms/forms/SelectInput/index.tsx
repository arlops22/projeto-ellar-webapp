import Select, { DropdownIndicatorProps, NoticeProps, Props, components } from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';

import classNames from 'classnames';

import { IError } from '../../../../types';

import Icon from '../../Icon';

type IProps = Omit<Props, 'onChange' | 'name'> & {
	value: string
	label?: string
	error?: IError
	isAsync?: boolean
	isCreatable?: boolean
	className?: string
	supportText?: string
	onCreateOption?: Function
	loadOptions?: Function
	name: string
	defaultOptions?: any
	onChange: (value: string, name: string)=> void,
}

const DropdownIndicator = (props: DropdownIndicatorProps) => (
	<components.DropdownIndicator {...props}>
		<Icon
			color='gray-900'
			name='chevronDown'
			size={16}
		/>
	</components.DropdownIndicator>
);

const CreatableNoOptionsMessage = (props: NoticeProps & { onCreateOption?: Function }) => (
	<components.NoOptionsMessage {...props}>
		<div
			onClick={() => props.onCreateOption && props.onCreateOption()}
			className='text-body-md hover:underline flex items-center justify-center'
		>
			<Icon
				name='chevronDown'
				size={18}
			></Icon>
			<span className='ml-2'>
				Adicionar Novo
			</span>
		</div>
	</components.NoOptionsMessage>
);

const Option = (props: any) => (
	<components.Option {...props}>
		{props.data.__isNew__
			? (
				<div className='text-body-md hover:underline flex items-center justify-center'>
					<Icon
						name='chevronDown'
						size={18}
					/>
					<span className='ml-2'>
						Adicionar Novo
					</span>
				</div>
			)
			: props.children
		}
	</components.Option>
);

const SelectInput = (props: IProps) => {
	const {
		value,
		label, 
		name, 
		isAsync, 
		isCreatable, 
		className, 
		error, 
		supportText, 
		onChange,
		...rest 
	} = props;

	const getSelectValue = (options: any, value: string) => {
		return options.find((option: any) => {
			let current_value = option['values'];
			if (rest.getOptionValue) {
				current_value = rest.getOptionValue(option);
			}
			
			return current_value === value;
		});
	};

	const styles = {
		container: 'flex flex-col-reverse relative w-full',
		input: {
			base: '',
			control: {
				base: 'h-10 border border-gray-100 rounded-lg px-4 bg-white hover:cursor-pointer',
				focus: 'min-h-11 cursor-pointer box-shadow-none border-1 border-solid border-secondary-m rounded',
				invalid: 'border border-primary-d rounded bg-white hover:cursor-pointer text-body-sm px-3',
				disabled: 'bg-stroke-low text-stroke-high !cursor-not-allowed'
			},
			option: {
				base: 'hover:cursor-pointer px-3 py-2 rounded',
				focus: 'hover:bg-primary-d/[0.08]',
				selected: '!text-white !bg-primary-d hover:bg-transparent'
			},
			menu: 'p-1 mt-2 border text-body-sm border-gray-200 bg-white rounded',
			placeholder: 'text-body-lg text-gray-300 font-normal',
			value: {
				container: '',
				single: 'text-body-lg text-paragraph-high',
				multi_value: 'bg-secondary-m rounded items-center pl-2 pr-1 gap-1.5 text-white',
				multi_value_label: 'text-white',
				multi_value_remove: 'border text-secondary-m border-gray-500 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded',
			},
			empty_message: 'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded'
		},
		label: {
			base: 'text-body-lg font-medium text-paragraph-medium mb-2',
			invalid: '!text-primary-d'
		},
		support_text: {
			base: 'text-label-sm ml-2 mt-1',
			invalid: '!text-primary-d'
		}
	};

	const resetStyles = {
		menuPortal: (base: any) => ({
			...base,
			zIndex: 9999 
		}),
		input: (base: any) => ({
			...base,
			'input:focus': {
				boxShadow: 'none',
			},
		}),
		multiValueLabel: (base: any) => ({
			...base,
			whiteSpace: 'normal',
			overflow: 'visible',
		}),
		control: (base: any) => ({
			...base,
			transition: 'none',
		}),
	};

	const select_props = {
		value: getSelectValue(rest.options, value),
		onChange: (option: any) => onChange(option.value, name),
		unstyled: true,
		classNames: {
			control: ({ isDisabled }: any) =>
				classNames(
					styles.input.control.base,
					{ 
						[styles.input.control.invalid]: error !== undefined,
						[styles.input.control.disabled]: isDisabled
					}
				),
			option: ({ isFocused, isSelected }: any) => 
				classNames(
					styles.input.option.base,
					{
						[styles.input.option.focus]: isFocused,
						[styles.input.option.selected]: isSelected
					}
				),
			placeholder: () => styles.input.placeholder,
			input: () => styles.input.base,
			valueContainer: () => styles.input.value.container,
			singleValue: () => styles.input.value.single,
			multiValue: () => styles.input.value.multi_value,
			multiValueLabel: () => styles.input.value.multi_value_label,
			multiValueRemove: () => styles.input.value.multi_value_remove,
			menu: () => styles.input.menu,
			noOptionsMessage: () => styles.input.empty_message
		},
		components: {
			DropdownIndicator,
			Option,
			NoOptionsMessage: 
				isCreatable
					? (props: NoticeProps) => (
						<CreatableNoOptionsMessage
							onCreateOption={rest.onCreateOption}
							{...props}
						/>
					)
					: components.NoOptionsMessage,
			...props.components
		},
		noOptionsMessage: () => 'Lista de opções vazia',
		styles: resetStyles,
		menuPortalTarget: document.body,
		...rest
	};

	let SelectTag = Select;

	if (isAsync) {
		SelectTag = AsyncSelect;
	}

	if (isCreatable) {
		SelectTag = CreatableSelect;
	}

	return (
		<div 
			className={classNames(
				styles.container,
				className,
			)}
		>
			{supportText && (
				<p 
					className={classNames(
						styles.support_text.base,
						{ [styles.support_text.invalid]: error !== undefined }
					)}
				>
					{supportText}
				</p>
			)}
			<SelectTag {...select_props} />
			{label && (
				<label
					className={classNames(
						styles.label.base,
						{ [styles.label.invalid]: error !== undefined }
					)}
					htmlFor={name}
				>
					{label}
				</label>
			)}
		</div>
	);
};

export default SelectInput;