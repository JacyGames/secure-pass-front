import {useState, useEffect, useMemo} from 'react';
import {fetchPassInfos} from '../shared/requests';
import {useParams, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import {deletePassInfos} from '../shared/requests';
import PropTypes from 'prop-types';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Pagination from './Pagination';
import {useContext} from 'react';
import {UserContext} from './UserContext';

function ResponseTable({setLoading, setDeleteAction}) {
  const [allItemsCount, setAllItemsCount] = useState(0);
  const [passInfos, setPassInfos] = useState([]);
  const {page} = useParams();
  const navigate = useNavigate();
  const {setCurrentUser} = useContext(UserContext);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
    };
  }, []);

  const getPassInfos = (number) => {
    setLoading(true);
    fetchPassInfos(number, navigate, setCurrentUser, setLoading)
        .then((responseData) => {
          setPassInfos(responseData.data.passwordInfos);
          setAllItemsCount(responseData.data.pagination.allItemsCount);
          setLoading(false);
        });
  };

  const deletePass = (id) => {
    deletePassInfos(id).then(() => getPassInfos(page));
    setDeleteAction(true);
  };


  const editPass = (id) => {
    navigate(`/editUser/${id}`, {replace: true});
  };

  useEffect(() => {
    getPassInfos(page);
  }, []);

  function getSequenceNumber(count) {
    return (page * 10 - 10 + count);
  }

  const columnDefs = [
    {
      headerName: '',
      field: '',
      width: 60,
      pinned: 'left',
      valueGetter: (params) => getSequenceNumber(params.node.rowIndex + 1),
    },
    {headerName: 'Description', field: 'description'},
    {headerName: 'Name', field: 'name'},
    {headerName: 'Login', field: 'login'},
    {headerName: 'Password', field: 'password'},
    {headerName: 'Site Url', field: 'url'},
    {headerName: 'Username', field: 'passUserName'},
    {headerName: 'Importance Level', field: 'importanceLevel'},
    {headerName: 'Folder', field: 'folder'},
    {
      headerName: 'Created Date',
      field: 'createdDate',
      valueFormatter: (params) =>
        params.value ? params.value.slice(0, 19) : '',
    },
    {
      headerName: '',
      field: '',
      width: 180,
      pinned: 'right',
      cellStyle: {justifyContent: 'center', alignItems: 'center'},
      cellRendererFramework: (params) => (
        <>
          <Button
            className="me-2"
            style={{width: '65px'}}
            variant="primary"
            size="sm"
            onClick={() => editPass(params.data.id)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            style={{width: '65px'}}
            onClick={() => deletePass(params.data.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ]
  ;
  const gridOptions = {
    rowHeight: 50,
  };

  return (
    <div>
      <div className="ag-theme-alpine-dark p-3" style={{height: 600}}>
        <AgGridReact
          rowData={passInfos}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          gridOptions={gridOptions}
        />
        <Pagination setLoading={setLoading}
          allItemsCount={allItemsCount} page={page}/>
      </div>
    </div>
  );
}

ResponseTable.propTypes = {
  setLoading: PropTypes.func,
  setDeleteAction: PropTypes.func,
};

export default ResponseTable;
