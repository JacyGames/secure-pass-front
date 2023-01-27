import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import {FORM_OBJECT} from '../models/responseModels';
import PropTypes from 'prop-types';

function Forms(props) {
  const onChange = (e) => {
    const {value, name} = e.target;

    props.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form className='m-auto w-70 col-md-8
offset-md-3 border rounded p-5 mt-5 shadow'>
      <Row>
        <Col>
          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label>Country</Form.Label>
            <Form.Control name="description" value={props.passState.description}
              onChange={onChange} type="text" placeholder="Country" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={props.passState.name}
              onChange={onChange} type="text" placeholder="Enter name" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="url" value={props.passState.url}
              onChange={onChange} type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Login</Form.Label>
            <Form.Control name="login" value={props.passState.login}
              onChange={onChange} type="text" placeholder="Enter login" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3 " controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" value={props.passState.password}
              onChange={onChange} type="password" placeholder="Password" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Button onClick={() => {
          props.onSubmit(props.passState);
        }} className='m-auto'
        style={{width: 250}} variant="primary">
          Submit
        </Button>
      </Row>
    </Form>
  );
}

Forms.propTypes = {
  onSubmit: PropTypes.func,
  setState: PropTypes.func,
  passState: PropTypes.shape(FORM_OBJECT),
};

export default Forms;
