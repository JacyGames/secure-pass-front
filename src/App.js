import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import ResponseTable from './Components/Table';
import Home from './Components/Home';
import PostInfo from './Components/PostInfo';
import EditUser from './Components/EditUser';
import Login from './Components/LogIn';
import Signup from './Components/SignUp';
import Spinner from 'react-bootstrap/Spinner';
import {useState, useEffect, useMemo} from 'react';
import {UserContext} from './Components/UserContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(
      localStorage.getItem('loggedIn') === 'true',
  );
  const providerValue = useMemo(() => (
    {currentUser, setCurrentUser}
  ), [currentUser, setCurrentUser]);

  useEffect(() => {
    localStorage.setItem('loggedIn', currentUser);
  }, [currentUser]);

  return (
    <div>
      <BrowserRouter>
        <div>
          <UserContext.Provider value={providerValue}>
            <NavBar />
            <div>
              {loading ? <Spinner animation="border" role="status"
                onClick={(e) => {
                  e.stopImmediatePropagation();
                }}>
                <span className="visually-hidden">Loading...</span>
              </Spinner> : null}
            </div>
            <Routes>
              <Route path="/home"
                element={ <Home />}/>
              <Route element={<ProtectedRoute user={currentUser}/>}>
                <Route path="/table/:page"
                  element={<ResponseTable setLoading={setLoading}/>}/>
                <Route path="/form" element={
                  <PostInfo setLoading={setLoading}/>} />
                <Route path="/edituser/:id" element={
                  <EditUser setLoading={setLoading}/>} />
              </Route>
              <Route path="/login"
                element={<Login setLoading={setLoading}/>} />
              <Route path="/signUp"
                element={<Signup setLoading={setLoading}/>} />
            </Routes>
          </UserContext.Provider>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;
