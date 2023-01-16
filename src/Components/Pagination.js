import PropTypes from 'prop-types';
import {ROWS_PER_PAGE} from '../shared/consts';

const Pagination = ({allItemsCount, changePage}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allItemsCount / ROWS_PER_PAGE); i++) {
    pageNumbers.push(i);
  };

  return (
    <div>
      <ul className="pagination">
        {
          pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <a href="#" className="page-link"
                onClick={() => {
                  changePage(number);
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
  allItemsCount: PropTypes.number,
  changePage: PropTypes.func,
};

export default Pagination;
