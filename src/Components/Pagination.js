import axios from 'axios';

const Pagination = ({ setResponse, baseURL, pageNumbers, setCount }) => {
  /*  const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(allItemsCount / rowsPerPage); i++) {
     pageNumbers.push(i);
   } */

  return (
    <div>
      <ul className="pagination">
        {
          pageNumbers.map(number => (
            <li className="page-item" key={number}>
              <a href="#" className="page-link" onClick={() => {
                axios.get(`${baseURL}/Passwords?page=${number}`).then((response) => {
                  setResponse(response.data.passwordInfos);
                  setCount(number - 1)
                });
              }}>
                {number}
              </a>
            </li>
          ))

        }
      </ul>
    </div>
  )
}

export default Pagination;
