import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

interface IProps {
    holdings?: any
}

const PortfolioTableComponent = (props: IProps) => {
    
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    return (
        <Table striped bordered hover>
            <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Total Cost</th>
            </tr>
            {
                props.holdings ? 
                Object.keys(props.holdings).map((ticker) => {
                    return <tr>
                        <td>{ticker}</td>
                        <td>{props.holdings[ticker][0]}</td>
                        <td>{formatter.format(props.holdings[ticker][1])}</td>
                    </tr>
                })
                :
                null
            }
        </Table>
    );
}

export default PortfolioTableComponent;
