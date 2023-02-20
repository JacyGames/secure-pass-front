import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Row, Col} from 'react-bootstrap';
import {FORM_OBJECT} from '../models/responseModels';
import PropTypes from 'prop-types';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';
import {useState} from 'react';

function Forms(props) {
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => {
    const {value, name} = e.target;

    props.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form className='m-auto w-50 col-md-8
offset-md-3 border rounded p-5 mt-5 shadow'>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control name="passUserName" maxLength={15}
              value={props.passState.passUserName}
              onChange={onChange} type="text" placeholder="Enter Username" />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control maxLength={15}
              name="name" value={props.passState.name}
              onChange={onChange} type="text" placeholder="Enter name" />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Site Url</Form.Label>
            <Form.Control name="url" value={props.passState.url} maxLength={25}
              onChange={onChange} type="email" placeholder="Enter email" />
          </Form.Group>
        </Col>
        <Col lg={6}>
          <Form.Group>
            <Form.Label>Login</Form.Label>
            <Form.Control name="login" value={props.passState.login}
              maxLength={15}
              onChange={onChange} type="text" placeholder="Enter login" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formBasicPassword" className='mb-4'>
            <Form.Label>Password</Form.Label>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Form.Control name="password" value={props.passState.password}
                onChange={onChange} type={showPassword ? 'text' : 'password'}
                placeholder="Password" maxLength={15}
              />
              <Button variant="light"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEye/> :
               <AiOutlineEyeInvisible/>}
              </Button>
            </div>
          </Form.Group>
          <Form.Select
            value={props.passState.importanceLevel} className='mb-4'
            onChange={onChange} name="importanceLevel" style={{width: 200}}>
            <option value="0">Importance Level</option>
            <option value="1">Minor</option>
            <option value="2">Regular</option>
            <option value="3">High</option>
            <option value="4">Severe</option>
          </Form.Select>
          <Form.Select
            value={props.passState.folder}
            onChange={onChange} name="folder" style={{width: 200}}>
            <option>Folder</option>
            <option value="business">Business</option>
            <option value="shopping">Shopping</option>
            <option value="social">Social</option>
            <option value="productivity tools">Productivity Tools</option>
          </Form.Select>
        </Col>
        <Col className='mb-3'>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control name="description" value={props.passState.description}
              onChange={onChange} type="text" placeholder="Country"
              as="textarea" rows={4} maxLength={64}/>
          </Form.Group>
        </Col>
      </Row>
      <Row className='mb-4'>
        <Col className='d-flex justify-content-end '>
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
