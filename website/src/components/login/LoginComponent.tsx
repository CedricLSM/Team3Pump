import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import LoginRequest from '../../shared/dto/LoginRequest'
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

interface IProps {
    handleSuccessLogin: () => void;
    navigateToSignUp: () => void;
}

const LoginComponent = (props: IProps) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [loginError, setLoginError] = useState<string>();

    const handleSubmit = ((e:  FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginError("");

        const loginEndpoint = '/api/accounts/login';
        const loginData: LoginRequest = {
            email: email,
            password: password
        }

        axios.post(loginEndpoint, loginData).then(res => {
            //redirect -> call callback function to handleLoginSuccess
            if (res.data.email) {
                props.handleSuccessLogin();
            }
            else {
                setLoginError('Invalid Username / Password')
            }
        })
    })

    return (
        <Col xs={2}>
            <Row>
                <img src="/logoblack.svg" width="100%"/>
            </Row>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" onChange={e => setEmail(e.target.value)} defaultValue={email}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} defaultValue={password}/>
                </Form.Group>
                <Row> 
                    <Button type="submit" variant="primary" block className="mx-3">Login</Button>
                </Row>
                <Row className="mt-2">
                    <Button href="/signup" variant="primary" block className="mx-3">No Account? Sign Up</Button>
                </Row>
                <Row>
                    {loginError ? <Alert variant="danger" className="mt-2 mx-3 block text-center w-100">{loginError}</Alert>: ''}
                </Row>
            </Form>
        </Col>
    );
}

export default LoginComponent;
