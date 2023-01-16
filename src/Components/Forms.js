import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function Forms(props) {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');

  const addPost = () => {
    axios.post(`${props.baseURL}/Passwords`, {
      description: country,
      name: name,
      login: login,
      password: password,
      url: email,
    })
        .then(function() {
          setName('');
          setLogin('');
          setPassword('');
          setEmail('');
          setCountry('');
        })
        .then(
            () => {
              axios.get(`${props.baseURL}/Passwords?page=1`)
                  .then((response) => {
                    props.setResponse(response.data.passwordInfos);
                  });
            })
        .catch(function(error) {
        // eslint-disable-next-line no-console
          console.log(error);
        });
  };

  return (
    <Form className='mt-5 m-auto w-75' >
      <Row>
        <Col>
          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label>Country</Form.Label>
            <Form.Control value={country} onChange={(e) => {
              setCountry(e.target.value);
            }} type="text" placeholder="Country" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control value={name} onChange={(e) => {
              setName(e.target.value);
            }} type="text" placeholder="Enter name" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control value={email} onChange={(e) => {
              setEmail(e.target.value);
            }} type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control value={login} onChange={(e) => {
              setLogin(e.target.value);
            }} type="text" placeholder="Enter login" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} onChange={(e) => {
              setPassword(e.target.value);
            }} type="password" placeholder="Password" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Button onClick={addPost} className='m-auto'
          style={{width: 250}} variant="primary">
          Submit
        </Button>
      </Row>
    </Form>
  );
}

Forms.propTypes = {
  baseURL: PropTypes.string,
  setResponse: PropTypes.func,
};

export default Forms;
