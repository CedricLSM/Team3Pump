import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import LoginRequest from '../../shared/dto/LoginRequest'
import { Form, Button } from 'react-bootstrap';

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
    const validateUser = (email: string) => {
        const regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regex.test(email)) {
            return true
        }
        setEmailError("Invalid Email")
        return false
    }


    const validatePassword = (password: string) => {
        const regex = /^(?=.*\d).{6,}$/
        if (regex.test(password)) {
            return true
        }
        setPasswordError("Invalid Password")
        return false
    }

    const handleSubmit = ((e:  FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!(validateUser(email) && validatePassword(password))) {
            return;
        }

        const loginEndpoint = '/api/accounts/login';
        const loginData: LoginRequest = {
            email: email,
            password: password
        }

        axios.post(loginEndpoint, loginData).then(res => {
            //redirect -> call callback function to handleLoginSuccess
            if (res.data.accountId) {
                props.handleSuccessLogin();
            }
            else {
                setLoginError('Invalid Login Credentials')
            }
        })
    })

    return (
        <Form onSubmit={handleSubmit}>
            {loginError ? <span>{loginError}</span>: ''}
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
        </Form>
    );
}

export default LoginComponent;
