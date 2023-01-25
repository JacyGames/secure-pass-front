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
import Forms from './Components/Forms';


function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/table/:page"
            element={
              <ResponseTable />} />
          <Route path="/form" element={
            <Forms />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
