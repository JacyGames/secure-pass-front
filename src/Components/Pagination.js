import PropTypes from 'prop-types';
import {ROWS_PER_PAGE} from '../shared/consts';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import '../App.css';

const Pagination = (props) => {
  const numberOfPages = [];
  const navigate = useNavigate();
  const [inputNumber, setInputNumber] = useState(1);

  for (let i = 1; i <= Math.ceil(props.allItemsCount / ROWS_PER_PAGE); i++) {
    numberOfPages.push(i);
  };

  const currentButtonNumber = Number(props.page);
  const pageNumberLimit = 5;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    navigate(`../table/${event.target.id}`, {replace: true});
    changePageLimit(currentButtonNumber);
  };

  const changePageLimit = (currentButtonNumber) => {
    if (currentButtonNumber + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    };
    if ((currentButtonNumber - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    };
  };

  const onInputChange = (e) => {
    setInputNumber(e.target.value);
  };

  const onSubmit = (e) => {
    navigate(`../table/${inputNumber}`, {replace: true});
    changePageLimit(currentButtonNumber);
  };

  const handleNextBtn = () => {
    navigate(`../table/${currentButtonNumber + 1}`, {replace: true});
    changePageLimit(currentButtonNumber);
  };

  const handlePrevBtn = () => {
    navigate(`../table/${currentButtonNumber - 1}`, {replace: true});
    changePageLimit(currentButtonNumber);
  };

  let pageIncrementBtn = null;
  if (numberOfPages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li className="page-item">
      <a href="" className="page-link"
        onClick={handleNextBtn}>&hellip;</a>
    </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li className="page-item">
      <a href="" className="page-link"
        onClick={handleNextBtn}>&hellip;</a>
    </li>;
  }

  const renderPageNumbers = numberOfPages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li className="page-item" key={number}>
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
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li className="page-item">
          <a href="" className="page-link"
            onClick={handleNextBtn}>
            Next
          </a>
        </li>
        <form onSubmit={onSubmit} className="form-pagination">
          <p className="text-pagination">Go to:</p>
          <input value={inputNumber}
            onChange={onInputChange} type="number"
            className="input-pagination page-link"
          />
          <input className="page-link" type="submit" value="Submit" />
        </form>
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
