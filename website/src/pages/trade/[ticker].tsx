import Head from 'next/head'
import { NextComponentType, NextPageContext, GetServerSideProps } from "next";
import DefaultLayout from '../../components/layouts/defaultlayout';
import { useRouter } from 'next/router';
import { parse } from 'cookie';
import { useEffect } from 'react';
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

  const result = await StockService.getStockInfo(query.ticker as string);
  const histPrice = await StockService.getStockHistory(query.ticker as string);
  
  let props: any

  props = {
    ticker: query.ticker,
    result: result,
  }
  props.historicalPrice = JSON.parse(histPrice);  

  if (!req.headers.cookie || !parse(req.headers.cookie).userId) {
    props.redirect = '/login';
  }
  
  // deletes undefined items in props
  Object.keys(props).forEach(key => {
    props[key] === undefined && delete props[key]
  })

	return {props: props}
}

const Home: NextComponentType<NextPageContext, any, IProps> = (props: IProps) => {
  const router = useRouter();

  useEffect(() => {
    if (props.redirect) {
      router.push(props.redirect)
    }
  }, [])

  let chartDate = {
    date: undefined,
    open: undefined,
    close: undefined,
    high: undefined,
    low: undefined
  }

  // console.log(histPrice['close'])

  if (props.historicalPrice['close']) {
    console.log("enter")
    const dates = props.historicalPrice.date['open'].map((key, value) => {
      return new Date(key[1]);
    })

    const open = props.historicalPrice.date['open'].map((key, value) => {
      return value;
    })

    const close = props.historicalPrice.date['close'].map((key, value) => {
      return value;
    })

    const high = props.historicalPrice.date['high'].map((key, value) => {
      return value;
    })

    const low = props.historicalPrice.date['low'].map((key, value) => {
      return value;
    })
  }

	return (
		<>
		<Head>
			<title>Portfolio</title>
		</Head>
    <DefaultLayout>
      {
        (props.result[0][props.ticker].bid && props.result[0][props.ticker].ask) ?
        <Row>
          <Col xs={6}>
            <StockChartComponent date={props.historicalPrice.date} open={props.historicalPrice.open} close={props.historicalPrice.close} high={props.historicalPrice.high} low={props.historicalPrice.low}/>
          </Col>
          <Col xs={6}>
            <StockInfoComponent ticker={props.ticker} info={props.result[0][props.ticker]} news={props.result[1]}/>
          </Col>
        </Row>
        :
        <Alert variant="warning">No Stock Information Found!</Alert>
      }
      
    </DefaultLayout>
		</>
	)
}

export default Home