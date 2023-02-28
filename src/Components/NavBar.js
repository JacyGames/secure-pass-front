import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {
  Link,
} from 'react-router-dom';
import AuthService from '../services/authService';
import {useContext} from 'react';
import {UserContext} from './UserContext';
function NavBar() {
  const {currentUser, setCurrentUser} = useContext(UserContext);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(false);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">Secure-Password</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {currentUser && <Nav className="me-auto">
              <Nav.Link as={Link}
                to="/table/1" >Home</Nav.Link>
              <Nav.Link as={Link} to="/form">Create password</Nav.Link>
            </Nav>}
            {currentUser ? (<Nav.Link
              onClick={logOut} >Log Out</Nav.Link>):
                (<Nav>
                  <Nav.Link as={Link} to="/login">Log In</Nav.Link>
                  <Nav.Link as={Link} to="/signUp">Sign Up</Nav.Link>
                </Nav>)}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
