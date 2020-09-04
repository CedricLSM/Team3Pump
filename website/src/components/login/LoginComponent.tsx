import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import LoginRequest from '../../shared/dto/LoginRequest'
import { Form, Button, Alert } from 'react-bootstrap';

interface IProps {
    handleSuccessLogin: () => void;
    navigateToSignUp: () => void;
}

const LoginComponent = (props: IProps) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [emailError, setEmailError] = useState<string>();
    const [passwordError, setPasswordError] = useState<string>();
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
            console.log("test");
            console.log(res);
            if (res.data.email) {
                props.handleSuccessLogin();
            }
            else {
                setLoginError('Invalid Username / Password')
            }
        })
    })

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" onChange={e => setEmail(e.target.value)} defaultValue={email}/>
                {emailError ? <span>{emailError}</span> : ''}
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} defaultValue={password}/>
                {passwordError ? <span>{passwordError}</span> : ''}
            </Form.Group>
            <Button type="submit">Submit</Button>
            {loginError ? <Alert variant="danger" className="mt-2">{loginError}</Alert>: ''}
        </Form>
    );
}

export default LoginComponent;
