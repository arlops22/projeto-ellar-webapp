import DataTable, { TableColumn } from 'react-data-table-component';

import SkeletonLoader from '../SkeletonLoader';

interface DataTableLoaderProps {
	columns: TableColumn<any>[]
	maxRows?: number
}

const DataTableLoader = (props: DataTableLoaderProps) => {
	const { columns, maxRows } = props;

	const dataTable_props: any = {
		data: Array(maxRows || 10).fill(''),
		columns: columns.map((column: TableColumn<any>) => ({
			...column,
			cell: () => {
				return column.name !== ''
					? (
						<SkeletonLoader 
							height={10}
							width={10}
						/>
					)
					: null;
			}
		})),
		customStyles: {
			table: {
				style: {
					backgroundColor: 'transparent'
				},
			},
			headRow: {
				style: {
					backgroundColor: '#F4F6F8',
					borderBottom: 'none !important',
					paddingTop: '16px',
					paddingBottom: '16px',
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
					paddingTop: '16px',
					paddingBottom: '16px',
					minHeight: '54px',
					with: '60px',
				},
			},
		} };
	return (
		<DataTable {...dataTable_props} />
	);
};

export default DataTableLoader;