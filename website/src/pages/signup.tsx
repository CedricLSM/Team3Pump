import React from 'react';
import { NextComponentType, NextPageContext } from 'next'
import SignupComponent from '../components/signup/SignupComponent';
import { useRouter } from "next/router"
import styles from './login.module.scss';

const signup: NextComponentType<NextPageContext, any> = () => {
    const router = useRouter();

    const handleSignupSuccess = () => {
        if (typeof router.query.redirectPath === 'string' && router.query.redirectPath !== '') {
            window.location.href = router.query.redirectPath
        } else {
            window.location.href = '/login'
        }
    }

    return (
        <div className={styles.container}>
            <SignupComponent handleSuccessSignup={handleSignupSuccess} />
        </div>
    );
}

export default signup;
