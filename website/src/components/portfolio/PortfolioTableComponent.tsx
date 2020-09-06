import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

interface IProps {
    holdings?: any
}

const PortfolioTableComponent = (props: IProps) => {

    return (
        <Table>
            <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Total Cost</th>
                <th>Profit / Loss</th>
            </tr>
            {
                props.holdings ? 
                Object.keys(props.holdings).map((ticker) => {
                    return <tr>
                        <td>{ticker}</td>
                        <td>{props.holdings[ticker]}</td>
                        <td>Price</td>
                        <td>Profit/Loss</td>
                    </tr>
                })
                :
                null
            }
        </Table>
    );
}

export default PortfolioTableComponent;
