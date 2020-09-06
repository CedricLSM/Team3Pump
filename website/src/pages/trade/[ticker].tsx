import Head from 'next/head'
import { NextComponentType, NextPageContext, GetServerSideProps } from "next";
import DefaultLayout from '../../components/layouts/defaultlayout';
import { useRouter } from 'next/router';
import { parse } from 'cookie';
import { useEffect, useState } from 'react';
import StockService from '../../services/stock';
import StockInfoComponent from '../../components/stock/StockInfoComponent';
import { Row, Col, Alert } from 'react-bootstrap';
import dynamic from 'next/dynamic'
import axios from 'axios';

const StockChartComponent = dynamic(() =>
  import('../../components/stock/StockChartComponent'),
  {ssr: false}
)

interface IProps {
  redirect?: string,
  ticker: string,
  result: any,
  historicalPrice: any,
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const { query, req, res } = context

  const ticker = query.ticker ? query.ticker as string: "AAPL";

  const result = await StockService.getStockInfo(ticker);
  const histPrice = await StockService.getStockHistory(ticker);
  
  let props: any

  props = {
    ticker: ticker,
    result: result,

  }
//   props.historicalPrice = JSON.parse(histPrice);  

  if (!req.headers.cookie || !parse(req.headers.cookie).userId) {
    props.redirect = '/login';
  }
  
  // deletes undefined items in props
  Object.keys(props).forEach(key => {
    props[key] === undefined && delete props[key]
  })

	return {props: props}
}

const Trade: NextComponentType<NextPageContext, any, IProps> = (props: IProps) => {
  const router = useRouter();
  const [ticker, setTicker] = useState<string>(props.ticker);
  const [info, setInfo] = useState(props.result[0][props.ticker]);
  const [news, setNews] = useState(props.result[1])
  const [historicalPrice, setHistoricalPrice] = useState(props.historicalPrice)


  useEffect(() => {
    if (props.redirect) {
      router.push(props.redirect)
    }
  }, [])

  useEffect(() => {
    console.log(ticker);
    axios.get('/api/stock/stock', {params: {ticker: ticker}})
        .then((r) => {
            console.log(r);
            setNews(r.data[1])
            setInfo(r.data[0][ticker])
        })
    // axios.get('/api/stock/stockhistory', {params: {symbol: ticker}})
    //     .then((r) => setHistoricalPrice(r))
  }, [ticker])

	return (
		<>
		<Head>
			<title>Portfolio</title>
		</Head>
        <DefaultLayout>
            <Row>
                <Col xs={6}>
                    {/* <StockChartComponent date={historicalPrice.date} open={historicalPrice.open} close={historicalPrice.close} high={historicalPrice.high} low={historicalPrice.low}/> */}
                </Col>
                <Col xs={6}>
                    <StockInfoComponent ticker={ticker} info={info} news={news} setTicker={setTicker}/>
                </Col>
            </Row>
        </DefaultLayout>
		</>
	)
}

export default Trade