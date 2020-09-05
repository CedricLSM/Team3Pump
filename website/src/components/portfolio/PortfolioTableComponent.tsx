import React, { useState } from 'react';
import { Table } from 'react-bootstrap';


const PortfolioTableComponent = () => {

    return (
        <Table>
            <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Total Cost</th>
                <th>Profit / Loss</th>
            </tr>
            <tr>
                <td>TSLA</td>
                <td>100</td>
                <td>30000</td>
                <td>-100</td>
            </tr>
        </Table>
    );
}

export default PortfolioTableComponent;
