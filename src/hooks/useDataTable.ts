import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ActionMeta } from 'react-select';

export interface ISortBy {
	field: string;
	direction: 'asc' | 'desc';
}

export interface IFilter {
	created_after: string;
	created_before: string;
}

export interface IUseDataTable {
	search: string;
	per_page: number;
	page: number;
	// sort_by: ISortBy;
	// filters: IFilter;
	onPageChange: (selectedItem: { selected: number; })=> void;
	onPerPageChange: (newValue: unknown, actionMeta: ActionMeta<unknown>)=> void;
	onSearch: (event: React.ChangeEvent<HTMLInputElement>)=> void;
	// onSort?: (field: string)=> void;
	// onFilter?: (filter: string, value: string)=> void;
}

export default function useDataTable(): IUseDataTable {

	const [ searchParams, setSearchParams ] = useSearchParams();

	const [ search, setSearch ] = useState('');
	const [ per_page, setPerPage ] = useState(10);
	const [ page, setPage ] = useState(1);
	// const [ sort_by, setSortBy ] = useState<ISortBy>({
	// 	field: 'created',
	// 	direction: 'desc'
	// });
	// const [ filters, setFilters ] = useState<IFilter>({
	// 	created_after: '',
	// 	created_before: ''
	// });

	const getPageParam = useCallback(() => {
		const page = searchParams.get('page');
		if (page === null) {
			searchParams.set('page', '1');
			setSearchParams(searchParams);
		} else {
			setPage(Number(page));
		}
	}, [ searchParams ]);
  
	const getPerPageParam = useCallback(() => {
		const perPage = searchParams.get('perPage');
		if (perPage === null) {
			searchParams.set('perPage', '10');
			setSearchParams(searchParams);
		} else {
			setPerPage(Number(perPage));
		}
	}, [ searchParams ]);
  
	const getSearchParam = useCallback(() => {
		const search = searchParams.get('search');
		if (search === null) {
			searchParams.set('search', '');
			setSearchParams(searchParams);
		} else {
			setSearch(search);
		}
	}, [ searchParams ]);

	// const getSortParam = useCallback(() => {
	// 	const sortBy = searchParams.get('sortBy');
	// 	if (sortBy === null) {
	// 		searchParams.set('sortBy', 'created,desc');
	// 		setSearchParams(searchParams);
	// 	} else {
	// 		const field = sortBy?.split(',')[0];
	// 		const direction = sortBy?.split(',')[1] as 'asc' | 'desc';
	// 		setSortBy({
	// 			field,
	// 			direction
	// 		});
	// 	}
	// }, [ searchParams ]);

	// const getFilterParam = useCallback(() => {
	// 	let newFilters = filters;
	// 	Object.keys(filters).forEach((key: string) => {
	// 		const filter_value = searchParams.get(key);
	// 		if (filter_value !== null) {
	// 			newFilters ={
	// 				...newFilters,
	// 				[key]: filter_value
	// 			};
	// 		}
	// 	});
  
	// 	setFilters(newFilters);
	// }, [ searchParams, filters ]);
  
	const setSearchParamsInitialState = useCallback(() => {
		getPageParam();
		getPerPageParam();
		getSearchParam();
	}, [ getPageParam, getPerPageParam, getSearchParam ]);
  
	useEffect(() => {
		setSearchParamsInitialState();
	}, [ setSearchParamsInitialState ]);
  
	useEffect(() => {
		setSearchParamsInitialState();
	}, [ setSearchParamsInitialState ]);
  
	const onPageChange = ({ selected: page }: { selected: number }) => {
		searchParams.set('page', String(page + 1));
		setSearchParams(searchParams);
		setPage(page + 1);
	};

	const onPerPageChange = (newValue: any) => {
		setPerPage(Number(newValue.value));
		searchParams.set('perPage', newValue.value);
		setSearchParams(searchParams);
	};

	const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const search = event.target.value;
		setSearch(search);
		searchParams.set('search', search);
		setSearchParams(searchParams);
	};

	// const onSort = (field: string) => {
	// 	setSortBy(oldSort => {
	// 		const direction = oldSort.direction === 'asc' ? 'desc' : 'asc';

	// 		searchParams.set('sortBy', `${ field },${ direction }`);
	// 		setSearchParams(searchParams);
	// 		return {
	// 			field,
	// 			direction
	// 		};
	// 	});
	// };

	// const onFilter = (filter: string, value: string) => {
	// 	setFilters({ ...filters, [filter]: value });
	// 	searchParams.set(filter, value);
	// 	setSearchParams(searchParams);
	// };

	return { 
		search, 
		per_page, 
		page, 
		// sort_by, 
		// filters,
		onPageChange, 
		onPerPageChange, 
		onSearch, 
		// onSort,
		// onFilter
	};
}