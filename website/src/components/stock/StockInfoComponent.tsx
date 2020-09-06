
import React, { useState, MouseEvent, FormEvent } from 'react';
import { Card, Table, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { AiOutlineEdit } from "react-icons/ai";
import axios from 'axios';

interface IProps {
    ticker: string,
    setTicker: any;
    info?: any,
    news?: any
}

const StockInfoComponent = (props: IProps) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [newTicker, setNewTicker] = useState<string>("AAPL");
    const [quantity, setQuantity] = useState<number>(0);
    
    const onClick = () => {
        setEdit(true);
    }

    const cancelSearch = () => {
        setEdit(false);
    }

    const handleSubmit = ((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEdit(false);
        props.setTicker(newTicker);
    })

    const handleBuy = (() => {
        console.log("Buy", quantity);
        axios.post("/api/portfolio/portfolio", 
            {
                ticker: newTicker,
                quantity: quantity,
                price: props.info.ask,
                buy: true
            })
    })

    const handleSell = (() => {
        console.log("Sell", quantity);
        axios.post("/api/portfolio/portfolio", 
            {
                ticker: newTicker,
                quantity: quantity,
                price: props.info.ask,
                buy: false
            })
    })

    return (
        <Card>
            <Card.Body>
                <Card.Title className="text-uppercase font-weight-bold">
                    {edit ?
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Form.Group as={Col} sm="4">
                                        <Form.Control type="text" onChange={e => setNewTicker(e.target.value)}/>
                                </Form.Group>
                                <Col sm="2">
                                        <Button type="submit" variant="light">Search</Button>
                                    </Col>
                                    <Col sm="2">
                                        <Button variant="danger" onClick={cancelSearch}>Cancel</Button>
                                </Col>
                            </Row>
                        </Form>
                    </>
                    :
                    <>
                        {props.ticker}<Button variant="link" onClick={onClick}><AiOutlineEdit /></Button>
                    </>}
                </Card.Title>
                {
                    (props.info.bid && props.info.ask && props.news != "No data found") ?
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
                                <td colSpan={2}> 
                                    <Form>
                                        <Form.Group>
                                            <Form.Control type="number" onChange={e => setQuantity(e.target.value)} placeholder="Quantity"/>
                                        </Form.Group>
                                    </Form>
                                </td>
                            </tr>
                            <tr>
                                <td><Button variant="primary" block onClick={handleBuy}>Buy</Button></td>
                                <td><Button block onClick={handleSell}>Sell</Button></td>
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
                    <Alert variant="warning">No Stock Information Found!</Alert>
                }
                
            </Card.Body>
        </Card>
      );
}

export default StockInfoComponent;
