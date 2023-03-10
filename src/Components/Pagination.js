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

  const btnMarkup = <li className="page-item">
    <a className="page-link"
      onClick={(e) => {
        e.preventDefault();
      }}>
  &hellip;</a>
  </li>;

  for (let i = Math.max(1, currentPage - 2);
    i <= Math.min(lastPage, currentPage + 2); i++) {
    numberOfPages.push(i);
  }

  let pageIncrementBtn = null;
  if (currentPage < lastPage - 3) {
    pageIncrementBtn = btnMarkup;
  }

  let pageDecrementBtn = null;
  if (currentPage > 4) {
    pageDecrementBtn = btnMarkup;
  }

  const handleClick = (event) => {
    props.setLoading(true);
    navigate(`../table/${event.target.id}`, {replace: true}).then(
        props.setLoading(false),
    );
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
          <a href="" className="page-link" cursor='pointer' id={number}
            onClick={handleClick}>
            {number}
          </a>
        </li>
      );
    } else {
      return null;
    }
  });

  {
    if (lastPage === 1 || lastPage === 0) {
      return null;
    } else {
      return (
        <div>
          <ul className="pagination">
            <li className="page-item">
              <a href="" className="page-link"
                onClick={handlePrevBtn}>
            Prev
              </a>
            </li>
            <li className={`page-item
            ${firstPage === currentPage ? 'active' : ''}`}
            >
              <a href="" className="page-link" id={firstPage}
                onClick={handleClick}>
                {firstPage}
              </a>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li className={`page-item
            ${lastPage === currentPage ? 'active' : ''}`}
            >
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
        </div>);
    }}
};

Pagination.propTypes = {
  setLoading: PropTypes.func,
  page: PropTypes.string,
  allItemsCount: PropTypes.number,
};

export default Pagination;
