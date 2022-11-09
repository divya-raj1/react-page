import React, { useState, useRef } from 'react';
import {Button, Col, Form, Row, FloatingLabel, Nav} from 'react-bootstrap';
import './login.css';
import {addUser} from '../data/Data'
import { useNavigate } from 'react-router-dom'; 

export default function Login() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    var email = useRef();

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            
        } else {
            try {
                await addUser(email.current.value);
                navigate("/dashboard");
            } catch (error) {
                alert(error);
            }
        }
        setValidated(true);
    };

    return (
        <Form validated={validated} noValidate onSubmit={handleSubmit} className="login-form">
            <h1 className="mb-4">LOGIN</h1>
            <FloatingLabel
                controlId="validationCustom03"
                label="Email address"
                className="mb-4">
                <Form.Control type="email" ref={email} placeholder="Email addres" pattern=".+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" required/>
                <Form.Control.Feedback type="invalid">
                    Please provide valid email
                </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Password">
                <Form.Control type="password" placeholder="Password" pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}" required/>
                <Form.Control.Feedback type="invalid">
                    Please provide valid password
                </Form.Control.Feedback>
            </FloatingLabel>

            <Form.Group as={Row} className="mt-4">
                <Col sm={{ span: 10}}>
                    <Button type="submit"  className="button">Login</Button>
                </Col>
            </Form.Group>
            <hr/>
            <Form.Text id="register">
                Need an account?<Nav.Link href="/signup">Sign Up</Nav.Link>
            </Form.Text>
        </Form>
    )
}
