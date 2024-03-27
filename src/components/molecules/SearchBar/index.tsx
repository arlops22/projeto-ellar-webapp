import {
	ChangeEvent, FocusEventHandler, forwardRef, useEffect, useState 
} from 'react';
import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import Icon from '../../atoms/Icon';

interface IProps {
	placeholder?: string,
	className?: string,
	onSearch: Function,
	setIsLoading?: Function
	onFocus?: FocusEventHandler
	onBlur?: FocusEventHandler
}

const SearchBar = forwardRef<HTMLDivElement, IProps>((props, ref) => {
	const {
		className, onSearch, setIsLoading, ...inputProps 
	} = props;

	const [ searchParams ] = useSearchParams();

	const [ value, setValue ] = useState('');
	const [ debounce_timeout, setDebounceTimeout ] = useState<any>(null);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		if (onSearch) {
			if (setIsLoading) setIsLoading(true);
			clearTimeout(debounce_timeout);
			const current_timeout = setTimeout(async() => {
				await onSearch(event.target.value);
				if (setIsLoading) setIsLoading(false);
			}, 1500);
			setDebounceTimeout(current_timeout);
		}
	};

	const classes = {
		wrapper: 'relative flex-1',
		input: {
			size: 'h-10 w-full py-4 pr-4 pl-12',
			format: 'rounded border border-gray-300 outline-none',
			text: 'text-body-lg text-gray-900',
			animation: 'focus:border-primary-m'
		}
	};

	useEffect(() => {
		if (searchParams.get('search')) {
			setValue(searchParams.get('search') as string);
		}
	}, []);

	return (
		<div 
			ref={ref} 
			className={classNames(
				classes.wrapper,
				className
			)}
		>
			<input
				type='search'
				name='search'
				id='search'
				value={value}
				onChange={onChange}
				{...inputProps}
				className={classNames(
					classes.input.size,
					classes.input.format,
					classes.input.text,
					classes.input.animation
				)}
			/>
			<Icon 
				name='search' 
				color='gray-900' 
				className='absolute left-4 top-1/2 -translate-y-1/2'
			/>
		</div>
	);
});

export default SearchBar;