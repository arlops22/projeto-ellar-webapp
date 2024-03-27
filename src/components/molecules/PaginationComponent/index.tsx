import { useCallback } from 'react';
import ReactPaginate from 'react-paginate';
import Select, { Props } from 'react-select';

import classNames from 'classnames';

import { IUseDataTable } from '../../../hooks/useDataTable';

import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';

interface IProps extends Omit<IUseDataTable, 'search' | 'onSearch'> {
	total_count: number,
}

const PaginationComponent = (props: IProps) => {
	const {
		page,
		total_count,
		per_page,
		onPageChange,
		onPerPageChange
	} = props;

	const pagination_style = {
		wrapper: 'm-0 flex justify-end',
		navItem: 'w-6 h-6',
		navLink: 'w-full h-full flex items-center justify-center text-label-sm text-black',
		activeLink: '[&>a]:bg-primary-m [&>a]:text-white [&>a]:rounded-full [&>a]:text-label-md',
	};

	const per_pageOptions = [
		{
			label: '5',
			value: 5
		},
		{
			label: '10',
			value: 10
		},
		{
			label: '15',
			value: 15
		},
		{
			label: '20',
			value: 20
		},
	];

	const option_classes = {
		base: 'hover:cursor-pointer px-3 rounded text-black transition-all duration-200',
		focus: 'bg-gray-100 hover:bg-brand-main/20 active:bg-gray-200',
		selected: 'text-white bg-brand-main hover:!bg-brand-main',
	};

	const select_props: Props = {
		unstyled: true,
		name: 'perPage',
		id: 'perPage',
		onChange: onPerPageChange,
		options: per_pageOptions,
		menuPlacement: 'top',
		defaultValue: per_pageOptions[1],
		classNames: {
			control: ({ isFocused }: any) =>
				classNames(
					'cursor-pointer box-shadow-none border-1 border-solid rounded',
					{ 'border-secondary-m': isFocused },
					{ 'border-gray-300': !isFocused },
				),
			menu: () => 'border bg-white rounded',
			input: () => 'cursor-pointer',
			multiValue: () => 'bg-secondary-m rounded items-center pl-2 pr-1 gap-1.5 text-white',
			valueContainer: () => 'gap-1',
			multiValueRemove: () => 'border text-secondary-m border-gray-500 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded',
			dropdownIndicator: () => 'ml-2 cursor-pointer hover:bg-gray-100 text-black rounded hover:text-gray-500',
			option: ({ isFocused, isSelected }: any) =>
				classNames(
					isFocused ? option_classes.focus : '',
					isSelected ? option_classes.selected : '',
					option_classes.base
				),
		},
		components: {
			IndicatorSeparator: () => null,
		},
		
	};

	const startCount = useCallback(() => (per_page * (page - 1)) + 1, [ page, per_page ]);
	const endCount = useCallback(() => Math.min(startCount() + per_page - 1, total_count), [ startCount, per_page, total_count ]);
	return (

		<div className='flex justify-end items-center gap-6 px-6 py-4 border-t-[1px]'>
			<Typography
				tag='label'
				variant='base-base'
				className='leadgin-[22px]'
			>
				Resultados por página:
			</Typography>
			<Select {...select_props}/>
			<Typography
				tag='span'
				variant='base-base'
				className='leadgin-[22px]'
			>
				{`${ startCount() || '0' } - ${ endCount() || '0' } de ${ total_count || '0' }`}
			</Typography>
			<ReactPaginate
				previousLabel={(
					<Icon
						name='chevronLeft'
					/>
				)}
				nextLabel={(
					<Icon
						name='chevronRight'
					/>
				)}
				onPageChange={onPageChange}
				pageCount={Math.ceil(total_count / per_page)}
				containerClassName={pagination_style.wrapper}
				pageLabelBuilder={() => ''}
			/>
		</div>
	);
};

export default PaginationComponent;