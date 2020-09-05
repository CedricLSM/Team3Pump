import React, { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import SignupRequest from '../../shared/dto/SignupRequest'
import { Form, Button, Alert, Col, Row } from 'react-bootstrap';

interface IProps {
    handleSuccessSignup: () => void;
}

const SignupComponent = (props: IProps) => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [name, setName] = useState<string>();
    const [riskProfile, setRiskProfile] = useState<number>(1);
    const [signupError, setSignupError] = useState<string>();
    const [telegramId, setTelegramId] = useState<string>();

    const handleSubmit = ((e:  FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSignupError("");

        if (password.length < 6) {
            setSignupError("Password must have 6 characters or more!");
            return;
        }

        const signupEndpoint = '/api/accounts/signup';
        const teleId = telegramId === "" ? undefined : telegramId;

        const signupData: SignupRequest = {
            email: email,
            password: password,
            name: name, 
            riskProfile: riskProfile, 
            telegramId: teleId
        }

        console.log(signupData);

        axios.post(signupEndpoint, signupData).then(res => {
            //redirect -> call callback function to handleLoginSuccess
            console.log(res.data);
            if (res.data.email) {
                props.handleSuccessSignup();
            }
            else {
                setSignupError('Username is in use!')
            }
        })
    })

    const riskProfiles = ["Low Risk", "Moderate Risk", "High Risk"]

    return (
        <Col xs={2}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" onChange={e => setEmail(e.target.value)} defaultValue={email} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} defaultValue={password} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" onChange={e => setName(e.target.value)} defaultValue={name} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Risk Profile:</Form.Label>
                    <Form.Control as="select" onChange={e => setRiskProfile(riskProfiles.indexOf(e.target.value)+1)} defaultValue={riskProfiles[riskProfile-1]}>
                    {riskProfiles.map((description: string, index: number) => {
                        return <option key={index}>{description}</option>
                    })}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Telegram ID:</Form.Label>
                    <Form.Control type="text" onChange={e => setTelegramId(e.target.value)} defaultValue={telegramId}/>
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
