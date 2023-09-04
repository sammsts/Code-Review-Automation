import { DataTable } from 'primereact/datatable';

const Grid = (props) => {
    const { value, ...rest } = props;
  
    const defaultConfig = {
      sortOrder: 1,
      selectionMode: 'single',
      size: 'small',
      paginator: true,
      rows: 7,
      rowsPerPageOptions: [5, 7, 9],
      stripedRows: true,
      showGridlines: true,
      tableStyle: { minWidth: '50rem' },
      emptyMessage: 'Nenhum Registro Cadastrado',
    };
  
    const mergedProps = { ...defaultConfig, ...rest };
  
    return <DataTable value={value} {...mergedProps} />;
  };
  
  export default Grid;