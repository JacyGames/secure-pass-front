import PropTypes from 'prop-types';
import {ROWS_PER_PAGE} from '../shared/consts';
import {useNavigate} from 'react-router-dom';
import '../App.css';

const Pagination = (props) => {
  const numberOfPages = [];
  const navigate = useNavigate();
  const lastPage = Math.ceil(props.allItemsCount / ROWS_PER_PAGE);
  const firstPage = 1;
  const currentPage = Number(props.page);

  for (let i = Math.max(1, currentPage - 2);
    i <= Math.min(lastPage, currentPage + 2); i++) {
    numberOfPages.push(i);
  }

  const handleClick = (event) => {
    navigate(`../table/${event.target.id}`, {replace: true});
  };

  const handleNextBtn = () => {
    navigate(`../table/${currentPage + 1}`, {replace: true});
  };

  const handlePrevBtn = () => {
    navigate(`../table/${currentPage - 1}`, {replace: true});
  };

  const renderPageNumbers = numberOfPages.map((number) => {
    if (number !== firstPage && number !== lastPage) {
      return (
        <li className={`page-item ${number === currentPage ? 'active' : ''}`}
          key={number}>
          <a href="" className="page-link" id={number}
            onClick={handleClick}>
            {number}
          </a>
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <div>
      <ul className="pagination">
        <li className="page-item">
          <a href="" className="page-link"
            onClick={handlePrevBtn}>
            Prev
          </a>
        </li>
        <li className={`page-item ${firstPage === currentPage ? 'active' : ''}`}
          key={firstPage}>
          <a href="" className="page-link" id={firstPage}
            onClick={handleClick}>
            {firstPage}
          </a>
        </li>
        {renderPageNumbers}
        <li className={`page-item ${lastPage === currentPage ? 'active' : ''}`}
          key={lastPage}>
          <a href="" className="page-link" id={lastPage}
            onClick={handleClick}>
            {lastPage}
          </a>
        </li>
        <li className="page-item">
          <a href="" className="page-link"
            onClick={handleNextBtn}>
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.string,
  getPassInfos: PropTypes.func,
  allItemsCount: PropTypes.number,
};

export default Pagination;
