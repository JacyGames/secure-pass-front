import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import {useState} from 'react';
import {BASE_URL} from '../shared/consts';

function Forms() {
  const [form, setForm] = useState({
    name: '',
    login: '',
    password: '',
    email: '',
    country: '',
  });

  const onChange = (e) => {
    const {value, name} = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const addPost = async () => {
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': `${form.name}`,
        'login': `${form.login}`,
        'password': `${form.password}`,
        'url': `${form.email}`,
        'description': `${form.country}`,
      }),
    };
    try {
      const response = await fetch(BASE_URL, settings);
      const data = await response.json();
      setForm({
        name: '',
        login: '',
        password: '',
        email: '',
        country: '',
      });

      return data;
    } catch (e) {
      return e;
    }
  };

  return (
    <Form className='mt-5 m-auto w-75' >
      <Row>
        <Col>
          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label>Country</Form.Label>
            <Form.Control name="country" value={form.country}
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
            <Form.Control name="email" value={form.email}
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
        <Button onClick={addPost} className='m-auto'
          style={{width: 250}} variant="primary">
          Submit
        </Button>
      </Row>
    </Form>
  );
}

export default Forms;
