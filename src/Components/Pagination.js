import axios from 'axios';
import PropTypes from 'prop-types';

const Pagination = ({ setResponse, baseURL, allItemsCount, setCount, setPage }) => {
  const rowsPerPage = 10;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allItemsCount / rowsPerPage); i++) {
    pageNumbers.push(i);
  };

  return (
    <div>
      <ul className="pagination">
        {
          pageNumbers.map(number => (
            <li className="page-item" key={number}>
              <a href="#" className="page-link" onClick={() => {
                axios.get(`${baseURL}/Passwords?page=${number}`).then((response) => {
                  setResponse(response.data.passwordInfos);
                  setPage(number)
                });
              }}>
                {number}
              </a>
            </li>
          ))

        }
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  baseURL: PropTypes.string,
  rowsPerPage: PropTypes.number,
  allItemsCount: PropTypes.number,
  setResponse: PropTypes.func,
};

export default Pagination;
