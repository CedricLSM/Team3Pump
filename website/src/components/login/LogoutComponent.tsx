import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import LoginRequest from '../../shared/dto/LoginRequest'
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';


const LogoutComponent = () => {
    const router = useRouter();

    const handleSuccessLogout = () => {
        if (typeof router.query.redirectPath === 'string' && router.query.redirectPath !== '') {
            window.location.href = router.query.redirectPath
        } else {
            window.location.href = '/login'
        }
    }

    const handleClick = ((e:  React.MouseEvent<HTMLElement, MouseEvent>) => {
        const logoutEndpoint = '/api/accounts/logout'
        axios.get(logoutEndpoint).then(res => {
            handleSuccessLogout();
        })
    })

    return (
        <Button variant="dark" onClick={handleClick}>Log Out</Button>
    );
}

export default LogoutComponent;
