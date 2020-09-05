import React from 'react';
import { NextComponentType, NextPageContext, GetServerSideProps } from 'next'
import styles from './login.module.scss';
import LogoutComponent from '../components/login/LogoutComponent';

const Logout: NextComponentType<NextPageContext, any> = () => {

    return (
        <div className={styles.container}>
            <LogoutComponent />
        </div>
    );
}

export default Logout;
