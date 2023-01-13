import Pagination from './Pagination';
import { useState } from 'react';
import { Table } from 'react-bootstrap';


function ResponseTable(props) {
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.allItemsCount / rowsPerPage); i++) {
    pageNumbers.push(i);
  };
  let itemsCount = pageNumbers.map(number => { return (number * rowsPerPage - 10 + 1) })

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
              <td className="text-center p-2">{itemsCount[count]++}</td>
              <td className="text-center p-2">{article.description}</td>
              <td className="text-center p-2">{article.name}</td>
              <td className="text-center p-2">{article.login}</td>
              <td className="text-center p-2">{article.password}</td>
              <td className="text-center p-2">{article.url}</td>
            </tr>)
          })}
        </tbody>
      </Table>
      <Pagination setCount={setCount} pageNumbers={pageNumbers} setResponse={props.setResponse} baseURL={props.baseURL} rowsPerPage={rowsPerPage} allItemsCount={props.allItemsCount} />
    </div >
  )
}

export default ResponseTable;
