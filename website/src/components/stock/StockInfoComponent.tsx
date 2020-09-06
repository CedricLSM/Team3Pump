
import React, { useState, MouseEvent, FormEvent } from 'react';
import { Card, Table, Button, Form, Row, Col, Alert, Modal } from 'react-bootstrap';
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
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
        handleShow();
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
        handleShow();
    })

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

    return (
        <>
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
                                <Col sm="3">
                                        <Button type="submit" variant="outline-primary">Confirm</Button>
                                    </Col>
                                    <Col sm="3">
                                        <Button variant="outline-danger" onClick={cancelSearch}>Cancel</Button>
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
                                <td>{formatter.format(props.info.ask)}</td>
                                <td>{formatter.format(props.info.bid)}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}> 
                                    <Form>
                                        <Form.Group>
                                            <Form.Control type="number" onChange={e => setQuantity(parseInt(e.target.value))} placeholder="Quantity"/>
                                        </Form.Group>
                                    </Form>
                                </td>
                            </tr>
                            <tr>
                                <td><Button variant="primary" block onClick={handleBuy}>Buy</Button></td>
                                <td><Button variant="outline-danger" block onClick={handleSell}>Sell</Button></td>
                            </tr>
                        </Table>
                        <Table>
                            <tr>
                                <td className="text-center font-weight-bold">Recent News</td>
                            </tr>
                            {props.news.map((newsItem) => {
                                return <tr>
                                    <td><a href={newsItem.url} target="_blank">{decodeURIComponent(newsItem.title)}</a></td>
                                </tr>
                            })}
                        </Table>
                    </Card.Text>
                    :
                    <Alert variant="warning">No Stock Information Found!</Alert>
                }
                
            </Card.Body>
        </Card>
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>Transaction Added Successfully</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
      );
}

export default StockInfoComponent;
