import { ReactElement } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

import { IUseDataTable } from '../../../hooks/useDataTable';

import Button from '../../atoms/Button';

import EmptyList from '../EmptyList';
import PaginationComponent from '../PaginationComponent';
import SearchBar from '../SearchBar';

export interface IDataTableProps<T> extends IUseDataTable {
	data: T[];
	total_count: number;
	isLoading: boolean;
	emptyDataTitle: string;
	columns: TableColumn<T>[];
	labelRowsPerPage?: string;
	emptyDataDescription?: string;
	searchFilterPlaceholder?: string;
	// sortBy?: ISortBy;
	onRowsPerPageChange: any;
	filterComponent?: ReactElement;
	headerComponent?: ReactElement;
	addButtonComponent?: ReactElement;
	onAddFunction: ()=> void;
	onRowClicked: (row: any)=> void;
	setIsSearchLoading?: Function;
}

const Datatable = <T extends unknown>(props: IDataTableProps<T>) => {
	const { 
		data, 
		columns, 
		emptyDataTitle, 
		emptyDataDescription,
		searchFilterPlaceholder,
		isLoading, 
		onSearch,
		onAddFunction,
		onRowClicked,
		setIsSearchLoading,
		addButtonComponent,
		headerComponent,
		filterComponent,
		...paginationProps
		// sortBy 
	} = props;
    
	return (
		<div className='rounded-2xl shadow-xsm bg-white'>
			<div>
				<div className='flex items-center justify-between px-10 py-6'>
					{headerComponent || (
						<>
							<div className='w-4/12 flex gap-4'>
								{onSearch && (
									<SearchBar
										onSearch={onSearch} 
										setIsLoading={setIsSearchLoading}
										placeholder={	searchFilterPlaceholder || 'Buscar por...' }
									/>
								)}
							</div>
							{ addButtonComponent || (
								onAddFunction && (
									<Button
										theme='primary'
										onClick={onAddFunction}
										size='md'
										className='flex items-center '
									>
										<span>Adicionar</span>
									</Button>
								))}
						</>
					)}
				</div>
				<DataTable
					noHeader	
					columns={columns}
					data={data}
					paginationServer
					noDataComponent={(
						<div className='h-40 flex items-center justify-center'>
							<EmptyList
								title={emptyDataTitle || 'Tabela vazia'}
								description={emptyDataDescription || 'Nenhum dado encontrado'}
							/>
						</div>
					)}
					onRowClicked={onRowClicked}
					customStyles={{
						table: {
							style: {
								backgroundColor: 'transparent'
							},
						},
						headRow: {
							style: {
								backgroundColor: '#F4F6F8',
								borderBottom: 'none !important',
								padding: '16px',
								color: '#637381',
								borderRadius: ' 0px 0px 0px 0px !important'
							},
						},
						headCells: {
							style: {
								fontSize: '13px',
								fontWeight: '600',
								lineHeight: '24px'
							}
						},
						cells: {
							style: {
								fontSize: '14px',
								color: '#212B36'
							},
						},
						rows: {
							style: {
								backgroundColor: 'white',
								borderBottom: 'none !important',
								padding: '16px',
								minHeight: '54px',
								cursor: 'pointer',
							},
						},
					}}
				/>
				<PaginationComponent {...paginationProps}/>		
			</div>
		</div>
	);
};

export default Datatable;