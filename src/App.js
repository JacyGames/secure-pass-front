import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';

function App() {
  const baseURL = 'http://localhost:8080/api';
  const [response, setResponse] = useState([]);
  const [allItemsCount, setAllItemsCount] = useState(0);

  useEffect(
      () => {
        axios.get(`${baseURL}/Passwords?page=1`).then((response) => {
          setAllItemsCount(response.data.pagination.allItemsCount);
          setResponse(response.data.passwordInfos);
        });
      }, [],
  );
  return (
    <div>
      <NavBar allItemsCount={allItemsCount}
        baseURL={baseURL}
        setResponse={setResponse} response={response} />
    </div>
  );
}

export default App;
