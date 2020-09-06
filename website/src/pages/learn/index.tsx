import React from 'react';
import { NextComponentType, NextPageContext, GetServerSideProps } from 'next'
import DefaultLayout from '../../components/layouts/defaultlayout';

const Learn: NextComponentType<NextPageContext, any> = () => {

    return (
        <div className="container">
            <DefaultLayout>
                Learn more about investing
            </DefaultLayout>
        </div>
    );
}

export default Learn;
