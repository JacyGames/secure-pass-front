import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {loadUser} from '../shared/requests';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../shared/consts';
function EditUser() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    login: '',
    password: '',
    url: '',
    description: '',
  });

  const editPost = async () => {
    await axios.put(`${BASE_URL}/${id}`, user);
    navigate(`../table/1`, {replace: true});
  };

  useEffect(() => {
    loadUser(id).then((responseData) => {
      setUser(responseData.data);
    });
  }, []);

  const onChange = (e) => {
    const {value, name} = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form className='m-auto w-70 col-md-8
offset-md-3 border rounded p-5 mt-5 shadow' >
      <Row>
        <Col>
          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label>Country</Form.Label>
            <Form.Control name="description" value={user.description}
              onChange={onChange} type="text" placeholder="Country" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={user.name}
              onChange={onChange} type="text" placeholder="Enter name" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="url" value={user.url}
              onChange={onChange} type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control name="login" value={user.login}
              onChange={onChange} type="text" placeholder="Enter login" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" value={user.password}
              onChange={onChange} type="password" placeholder="Password" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Button onClick={() => {
          editPost(user);
        }} className='m-auto'
        style={{width: 250}} variant="primary">
          Submit
        </Button>
      </Row>
    </Form>
  );
}

export default EditUser;
