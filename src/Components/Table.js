import {Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {fetchPassInfos} from '../shared/requests';
import {useParams, useNavigate} from 'react-router-dom';
import Pagination from './Pagination';
import Button from 'react-bootstrap/esm/Button';
import {deletePassInfos} from '../shared/requests';
import PropTypes from 'prop-types';

function ResponseTable({setLoading}) {
  const [passInfos, setPassInfos] = useState([]);
  const [allItemsCount, setAllItemsCount] = useState(0);
  const {page} = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);

  const getPassInfos = (number) => {
    setLoading(true);
    fetchPassInfos(number).then((responseData) => {
      setPassInfos(responseData.data.passwordInfos);
      setAllItemsCount(responseData.data.pagination.allItemsCount);
      setCurrentUser(true);
      setLoading(false);
    });
  };

  const deletePass = (id) => {
    deletePassInfos(id).then(() => getPassInfos(page));
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

  return (
    <div>
      {currentUser ? <div className='p-3'>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th></th>
              <th className='text-center'>Description</th>
              <th className='text-center'>Name</th>
              <th className='text-center'>Login</th>
              <th className='text-center'>Password</th>
              <th className='text-center'>Site Url</th>
              <th className='text-center'>Username</th>
              <th className='text-center'>Importance Level</th>
              <th className='text-center'>Folder</th>
              <th className='text-center'>Created Date</th>
              <th className='text-center'></th>
            </tr>
          </thead>
          <tbody>
            {passInfos.map((article, id) => {
              return (<tr key={article.id}>
                <td className="text-center p-2">
                  {getSequenceNumber(id + 1)}
                </td>
                <td className="text-center p-2">{article.description}</td>
                <td className="text-center p-2">{article.name}</td>
                <td className="text-center p-2">{article.login}</td>
                <td className="text-center p-2">{article.password}</td>
                <td className="text-center p-2">{article.url}</td>
                <td className="text-center p-2">{article.passUserName}</td>
                <td className="text-center p-2">{article.importanceLevel}</td>
                <td className="text-center p-2">{article.folder}</td>
                <td className="text-center p-2">
                  {article.createdDate.slice(0, 19)}</td>
                <td className="text-center">
                  <Button className='me-2' style={{'width': '65px'}}
                    variant="primary" size="sm"
                    onClick={() => editPass(article.id)}>
                Edit</Button>{' '}
                  <Button variant="danger" size="sm" style={{'width': '65px'}}
                    onClick={() => deletePass(article.id)}>
                Delete</Button>{' '}</td>
              </tr>);
            })}
          </tbody>
        </Table>
        <Pagination setLoading={setLoading}
          allItemsCount={allItemsCount} page={page}/>
      </div >: null}
    </div>
  );
}

ResponseTable.propTypes = {
  setLoading: PropTypes.func,
};

export default ResponseTable;
