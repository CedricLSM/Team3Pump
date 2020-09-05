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
  const [result, setResult] = useState(props.result);
  const [historicalPrice, setHistoricalPrice] = useState(props.historicalPrice)


  useEffect(() => {
    if (props.redirect) {
      router.push(props.redirect)
    }
  }, [])

//   useEffect(() => {
//     console.log('ticker changed');
//   }, [ticker])

	return (
		<>
		<Head>
			<title>Portfolio</title>
		</Head>
        <DefaultLayout>
        {
            (result[0][ticker].bid && result[0][ticker].ask) ?
            <Row>
                <Col xs={6}>
                    {/* <StockChartComponent date={historicalPrice.date} open={historicalPrice.open} close={historicalPrice.close} high={historicalPrice.high} low={historicalPrice.low}/> */}
                </Col>
                <Col xs={6}>
                    {/* <StockInfoComponent ticker={ticker} info={result[0][props.ticker]} news={result[1]} changeTicker={setTicker}/> */}
                </Col>
            </Row>
            :
            <Alert variant="warning">No Stock Information Found!</Alert>
        }
        </DefaultLayout>
		</>
	)
}

export default Trade