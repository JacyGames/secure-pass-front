import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {
  Link,
} from 'react-router-dom';
import {useState, useEffect} from 'react';
import AuthService from '../services/authService';
import {useNavigate} from 'react-router-dom';

function NavBar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    navigate(`../home`, {replace: true});
    window.location.reload();
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {currentUser && <Nav className="me-auto">
              <Nav.Link as={Link}
                to="/table/1" >Home</Nav.Link>
              <Nav.Link as={Link} to="/form">Forms</Nav.Link>
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
