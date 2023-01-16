import Pagination from './Pagination';
import {Table} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {useState} from 'react';
import axios from 'axios';

function ResponseTable(props) {
  const [page, setPage] = useState(1);

  function createItemsCount(page, count) {
    return (page * 10 - 10 + count);
  }

  function changePage(number) {
    axios.get(`${props.baseURL}/Passwords?page=${number}`)
        .then((response) => {
          props.setResponse(response.data.passwordInfos);
          setPage(number);
        });
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
      <Pagination changePage={changePage}
        baseURL={props.baseURL}
        allItemsCount={props.allItemsCount}
      />
    </div >
  );
}

ResponseTable.propTypes = {
  baseURL: PropTypes.string,
  allItemsCount: PropTypes.number,
  setResponse: PropTypes.func,
  response: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string,
    name: PropTypes.string,
    login: PropTypes.string,
    password: PropTypes.string,
    passUserName: PropTypes.string,
    importanceLevel: PropTypes.number,
    url: PropTypes.string,
    folter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([null]),
    ]),
    createdDate: PropTypes.string,
  })),
};

export default ResponseTable;
