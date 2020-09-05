import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { NextComponentType, NextPageContext, GetServerSideProps } from "next";
import DefaultLayout from '../../components/layouts/defaultlayout';
import { useRouter } from 'next/router';
import { parse } from 'cookie';
import { useEffect } from 'react';
import axios from 'axios';
import StockService from '../../services/stock';


interface IProps {
  redirect?: string,
  ticker: string
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const { query, req, res } = context

  const result = await StockService.getStockInfo(query.ticker as string);
  console.log(result);

  let props: any

  props = {
    ticker: query.ticker
  }

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

	return (
		<>
		<Head>
			<title>Portfolio</title>
		</Head>
    <DefaultLayout>
      {props.ticker}
    </DefaultLayout>
		</>
	)
}

export default Home