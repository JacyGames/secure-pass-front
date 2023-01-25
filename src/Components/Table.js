import {Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {fetchPassInfos} from '../shared/requests';
import {useParams} from 'react-router-dom';
import Pagination from './Pagination';
import Spinner from 'react-bootstrap/Spinner';
function ResponseTable() {
  const [passInfos, setPassInfos] = useState([]);
  const [allItemsCount, setAllItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const {page} = useParams();

  const getPassInfos = (number) => {
    fetchPassInfos(number).then((responseData) => {
      setPassInfos(responseData.data.passwordInfos);
      setLoading(false);
      setAllItemsCount(responseData.data.pagination.allItemsCount);
    });
  };

  useEffect(() => {
    getPassInfos(page);
  }, []);

  function getSequenceNumber(count) {
    return (page * 10 - 10 + count);
  }

  if (loading ) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
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
            </tr>);
          })}
        </tbody>
      </Table>}
      <Pagination allItemsCount={allItemsCount} page={page}/>
    </div >
  );
}

export default ResponseTable;
