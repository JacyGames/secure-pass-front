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
import {useState} from 'react';
function App() {
  const [loading, setLoading] = useState(false);
  if (loading ) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/table/:page"
            element={<ResponseTable setLoading={setLoading}/>}/>
          <Route path="/form" element={
            <PostInfo setLoading={setLoading}/>} />
          <Route path="/edituser/:id" element={
            <EditUser setLoading={setLoading}/>} />
          <Route path="/login" element={<Login setLoading={setLoading}/>} />
          <Route path="/signUp" element={<Signup setLoading={setLoading}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
