import {Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {fetchPassInfos} from '../shared/requests';
import {useParams} from 'react-router-dom';
import Pagination from './Pagination';
import Button from 'react-bootstrap/esm/Button';
import {deletePassInfos} from '../shared/requests';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';

function ResponseTable({setLoading}) {
  const [passInfos, setPassInfos] = useState([]);
  const [allItemsCount, setAllItemsCount] = useState(0);
  const {page} = useParams();

  const getPassInfos = (number) => {
    setLoading(true);
    fetchPassInfos(number).then((responseData) => {
      setPassInfos(responseData.data.passwordInfos);
      setLoading(false);
      setAllItemsCount(responseData.data.pagination.allItemsCount);
    });
  };

  const deletePass = (id) => {
    deletePassInfos(id).then(() => getPassInfos(page));
  };

  useEffect(() => {
    getPassInfos(page);
  }, []);

  function getSequenceNumber(count) {
    return (page * 10 - 10 + count);
  }

  return (
    <div className='p-3'>
      {<Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th className='text-center'>Description</th>
            <th className='text-center'>Name</th>
            <th className='text-center'>Login</th>
            <th className='text-center'>Password</th>
            <th className='text-center'>Url</th>
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
              <td className="text-center">
                <Link className="btn btn-primary me-4"
                  style={{'height': '31px', 'fontWeight': '14px'}}
                  to={`/editUser/${article.id}`}>Edit</Link>
                <Button variant="danger" size="sm"
                  onClick={() => deletePass(article.id)}>
                Delete</Button>{' '}</td>
            </tr>);
          })}
        </tbody>
      </Table>}
      <Pagination setLoading={setLoading}
        allItemsCount={allItemsCount} page={page}/>
    </div >
  );
}

ResponseTable.propTypes = {
  setLoading: PropTypes.func,
};

export default ResponseTable;
