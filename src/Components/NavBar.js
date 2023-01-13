import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ResponseTable from './Table'
import Home from './Home'
import Forms from './Forms';


function NavBar(props) {
  return (
    <div>
      <BrowserRouter>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/table" >Home</Nav.Link>
                <Nav.Link as={Link} to="/form">Forms</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/table" element={<ResponseTable allItemsCount={props.allItemsCount} baseURL={props.baseURL} setResponse={props.setResponse} response={props.response} />} />
          <Route path="/form" element={<Forms baseURL={props.baseURL} setResponse={props.setResponse} response={props.response} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default NavBar;
