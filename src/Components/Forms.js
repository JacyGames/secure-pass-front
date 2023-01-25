import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import {useState} from 'react';
import {postPassInfos} from '../shared/requests';

function Forms() {
  const [form, setForm] = useState({
    name: '',
    login: '',
    password: '',
    url: '',
    description: '',
  });

  const addPost = (form) => {
    postPassInfos(form).then(() => {
      setForm({
        name: '',
        login: '',
        password: '',
        url: '',
        description: '',
      });
    });
  };

  const onChange = (e) => {
    const {value, name} = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form className='mt-5 m-auto w-75' >
      <Row>
        <Col>
          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label>Country</Form.Label>
            <Form.Control name="description" value={form.description}
              onChange={onChange} type="text" placeholder="Country" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={form.name}
              onChange={onChange} type="text" placeholder="Enter name" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="url" value={form.url}
              onChange={onChange} type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control name="login" value={form.login}
              onChange={onChange} type="text" placeholder="Enter login" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" value={form.password}
              onChange={onChange} type="password" placeholder="Password" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Button onClick={() => {
          addPost(form);
        }} className='m-auto'
        style={{width: 250}} variant="primary">
          Submit
        </Button>
      </Row>
    </Form>
  );
}

export default Forms;
