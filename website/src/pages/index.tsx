import Head from 'next/head'
import { NextComponentType, NextPageContext, GetServerSideProps } from "next";
import DefaultLayout from '../components/layouts/defaultlayout';
import { useRouter } from 'next/router';
import { parse } from 'cookie';
import { useEffect } from 'react';
import PortfolioTableComponent from '../components/portfolio/PortfolioTableComponent';
import PortfolioService from '../services/portfolio';


interface IProps {
  holdings?: any,
  redirect?: string
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const { query, req, res } = context

  let props: any

  props = {
  }


  if (!req.headers.cookie || !parse(req.headers.cookie).userId) {
    props.redirect = '/login';
    return {props: props}
  }
  const email = parse(req.headers.cookie).userId;
  const holdings = await PortfolioService.getCurrentHoldings(email)
    .then((r) => {
      return r
    });

  // const netHoldings = {};


  props.holdings = holdings;

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

  console.log(props);

	return (
		<>
		<Head>
			<title>Portfolio</title>
		</Head>
    <DefaultLayout>
      <PortfolioTableComponent holdings={props.holdings}/>
    </DefaultLayout>
		</>
	)
}

export default Home