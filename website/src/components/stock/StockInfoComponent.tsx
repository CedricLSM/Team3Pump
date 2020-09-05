
import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

interface IProps {
    ticker: string,
    info?: any,
    news?: any
}

const StockInfoComponent = (props: IProps) => {
    
    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-uppercase font-weight-bold">{props.ticker}</Card.Title>
                {
                    props.info ?
                    <Card.Text>
                        <Table>
                            <tr>
                                <td>Ask Price ({props.info.currency}):</td>
                                <td>Bid Price ({props.info.currency}):</td>
                            </tr>
                            <tr>
                                <td>{props.info.ask.toFixed(2)}</td>
                                <td>{props.info.bid.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td><Button variant="primary" block>Buy</Button></td>
                                <td><Button block>Sell</Button></td>
                            </tr>
                        </Table>
                        <Table>
                            <tr>
                                <td className="text-center font-weight-bold">Recent News</td>
                            </tr>
                            {props.news.map((newsItem) => {
                                return <tr>
                                    <td><a href={newsItem.url}>{decodeURIComponent(newsItem.title)}</a></td>
                                </tr>
                            })}
                        </Table>
                    </Card.Text>
                    :
                    null
                }
                
            </Card.Body>
        </Card>
      );
}

export default StockInfoComponent;
