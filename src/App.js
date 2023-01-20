import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import {useEffect} from 'react';
import {useState} from 'react';
import {getPasswords} from './shared/requests';
import {useCallback} from 'react';

function App() {
  const [response, setResponse] = useState([]);
  const [allItemsCount, setAllItemsCount] = useState(0);

  const fetchData = useCallback(async (number) => {
    const responseData = await getPasswords(number);
    setResponse(responseData.passwordInfos);
    setAllItemsCount(responseData.pagination.allItemsCount);
  }, []);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  return (
    <div>
      <NavBar response={response} allItemsCount={allItemsCount}
        setResponse={setResponse}
        getPasswords={getPasswords}
        fetchData={fetchData}
      />
    </div>
  );
}

export default App;
