import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import LoginRequest from '../../shared/dto/LoginRequest'
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';

interface IProps {
    handleSuccessSignup: () => void;
}

const SignupComponent = (props: IProps) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [signupError, setSignupError] = useState<string>();

    const handleSubmit = ((e:  FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSignupError("");

        if (password.length < 6) {
            setSignupError("Password must have 6 characters or more!");
            return;
        }

        const signupEndpoint = '/api/accounts/signup';
        const signupData: LoginRequest = {
            email: email,
            password: password
        }

        axios.post(signupEndpoint, signupData).then(res => {
            //redirect -> call callback function to handleLoginSuccess
            if (res.data.email) {
                props.handleSuccessSignup();
            }
            else {
                setSignupError('Username is in use!')
            }
        })
    })

    return (
        <Col xs={2}>
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
                    <Button type="submit" variant="primary" block className="mx-3">Sign Up</Button>
                </Row>
                <Row className="mt-2">
                    <Button href="/login" variant="primary" block className="mx-3">Have an account? Login</Button>
                </Row>
                <Row>
                    {signupError ? <Alert variant="danger" className="mt-2 mx-3 block text-center w-100">{signupError}</Alert>: ''}
                </Row>
            </Form>
        </Col>
    );
}

export default SignupComponent;
