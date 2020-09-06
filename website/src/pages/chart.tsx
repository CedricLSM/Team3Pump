import React from 'react';
import { NextComponentType, NextPageContext, GetServerSideProps } from 'next'
import styles from './login.module.scss';
import dynamic from 'next/dynamic'

const StockChartComponent = dynamic(() =>
  import('../components/stock/StockChartComponent'),
  {ssr: false}
)


const Chart: NextComponentType<NextPageContext, any> = () => {

    return (
        <div className={styles.container}>
            <StockChartComponent />
        </div>
    );
}

export default Chart;
