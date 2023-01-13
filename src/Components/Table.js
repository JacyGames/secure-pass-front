import Pagination from './Pagination';
import { useState } from 'react';
import { Table } from 'react-bootstrap';


function ResponseTable(props) {
  let count = 1;
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
            return (<tr key={id}>
              <td className="text-center p-2">{count++}</td>
              <td className="text-center p-2">{article.description}</td>
              <td className="text-center p-2">{article.name}</td>
              <td className="text-center p-2">{article.login}</td>
              <td className="text-center p-2">{article.password}</td>
              <td className="text-center p-2">{article.url}</td>
            </tr>)
          })}
        </tbody>
      </Table>
      <Pagination setResponse={props.setResponse} baseURL={props.baseURL} rowsPerPage={rowsPerPage} allItemsCount={props.allItemsCount} />
    </div >
  )
}

export default ResponseTable;
