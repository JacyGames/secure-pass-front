import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import {
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
import {useState, useMemo, useEffect} from 'react';
import {UserContext} from './Components/UserContext';
import ProtectedRoute from './Components/ProtectedRoute';
import {USER_TOKEN_KEY} from './shared/consts.js';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import AuthService from './services/authService';
import {useLocation, useNavigate} from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(false);
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const [deleteAction, setDeleteAction] = useState(false);
  const date = new Date().getTime();
  let tokenData;
  const [currentUser, setCurrentUser] = useState(
      !!localStorage.getItem(USER_TOKEN_KEY));
  const providerValue = useMemo(() => (
    {currentUser, setCurrentUser}
  ), [currentUser, setCurrentUser]);

  useEffect(() => {
    currentUser ?
    tokenData = Date.parse(AuthService.getCurrentUser().expiration) : null;
    if (tokenData < date) {
      AuthService.logout();
      setCurrentUser(false);
      navigate(`/login`, {replace: true});
      setLoading(false);
      toast.error('Session expired, please Log In again', {
        autoClose: 3000,
      });
    }
  }, [pathname, currentUser, deleteAction]);

  return (
    <div>
      <div>
        <UserContext.Provider value={providerValue}>
          <NavBar />
          <div>
            {loading ? <Spinner animation="border" role="status"
              style={{position: 'absolute', top: '40%', left: '50%',
                zIndex: '3', width: '100px', height: '100px', color: 'white'}}
              onClick={(e) => {
                e.stopImmediatePropagation();
              }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner> : null}
          </div>
          <Routes>
            <Route path="/home"
              element={ <Home />}/>
            <Route element={<ProtectedRoute user={currentUser}
              isAuthorized={false}
            />}>
              <Route path="/table/:page"
                element={<ResponseTable
                  setLoading={setLoading} setDeleteAction={setDeleteAction}/>}/>
              <Route path="/form" element={
                <PostInfo setLoading={setLoading}/>} />
              <Route path="/edituser/:id" element={
                <EditUser setLoading={setLoading}/>} />
            </Route>
            <Route element={<ProtectedRoute user={currentUser}
              isAuthorized={true}
            />}>
              <Route path="/login"
                element={<Login setLoading={setLoading}/>} />
              <Route path="/signUp"
                element={<Signup setLoading={setLoading}/>} />
            </Route>
          </Routes>
        </UserContext.Provider>
      </div>
      <ToastContainer />
    </div>
  );
}


export default App;
