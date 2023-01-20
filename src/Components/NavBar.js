import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import ResponseTable from './Table';
import Home from './Home';
import Forms from './Forms';
import PropTypes from 'prop-types';
import {RESPONSE_OBJECT} from '../models/responseModels';

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
          <Route path="/table"
            element={
              <ResponseTable response={props.response}
                allItemsCount={props.allItemsCount}
                getPasswords={props.getPasswords}
              />} />
          <Route path="/form" element={
            <Forms />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

NavBar.propTypes = {
  getPasswords: PropTypes.func,
  allItemsCount: PropTypes.number,
  setResponse: PropTypes.func,
  response: PropTypes.arrayOf(PropTypes.shape(RESPONSE_OBJECT)),
};

export default NavBar;
