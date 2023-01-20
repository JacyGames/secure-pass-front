import Pagination from './Pagination';
import {Table} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {useState} from 'react';
import {RESPONSE_OBJECT} from '../models/responseModels';

function ResponseTable(props) {
  const [page, setPage] = useState(1);
  function createItemsCount(page, count) {
    return (page * 10 - 10 + count);
  }

  return (
    <div className='p-3'>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th></th>
            <th className='text-center'>Description</th>
            <th className='text-center'>Name</th>
            <th className='text-center'>Login</th>
            <th className='text-center'>Password</th>
            <th className='text-center'>Url</th>
          </tr>
        </thead>
        <tbody>
          {props.response.map((article, id) => {
            return (<tr key={article.id}>
              <td className="text-center p-2">
                {createItemsCount(page, id + 1)}
              </td>
              <td className="text-center p-2">{article.description}</td>
              <td className="text-center p-2">{article.name}</td>
              <td className="text-center p-2">{article.login}</td>
              <td className="text-center p-2">{article.password}</td>
              <td className="text-center p-2">{article.url}</td>
            </tr>);
          })}
        </tbody>
      </Table>
      <Pagination
        setPage={setPage}
        getPasswords={props.getPasswords}
        allItemsCount={props.allItemsCount}
      />
    </div >
  );
}

ResponseTable.propTypes = {
  setResponse: PropTypes.func,
  getPasswords: PropTypes.func,
  allItemsCount: PropTypes.number,
  response: PropTypes.arrayOf(PropTypes.shape(RESPONSE_OBJECT)),
};

export default ResponseTable;
