import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import {useEffect} from 'react';
import {useState} from 'react';
import {BASE_URL} from './shared/consts';

function App() {
  const [response, setResponse] = useState([]);
  const [allItemsCount, setAllItemsCount] = useState(0);

  async function getPasswords(page) {
    try {
      let usersData =[];
      let initialUsersData =[];
      const dataResponse = await fetch(`${BASE_URL}?page=${page}`);
      const data = await dataResponse.json();
      usersData = data.passwordInfos;
      initialUsersData = [...usersData];
      setResponse(initialUsersData);
      setAllItemsCount(data.pagination.allItemsCount);
    } catch (error) {
      alert('Error');
    }
  }

  useEffect(
      () => {
        getPasswords(1);
      }, [],
  );

  return (
    <div>
      <NavBar response={response} allItemsCount={allItemsCount}
        getPasswords={getPasswords} />
    </div>
  );
}

export default App;
