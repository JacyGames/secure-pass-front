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
import {useState, useEffect} from 'react';
import AuthService from './services/authService';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          {currentUser &&<Route path="/home" element={<Home />} />}
          <Route path="/table/:page"
            element={<ResponseTable />}/>
          <Route path="/form" element={
            <PostInfo />} />
          <Route path="/edituser/:id" element={
            <EditUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
        </Routes>
      </div>
      <button onClick={logOut}>Log Out</button>
    </BrowserRouter>
  );
}

export default App;
