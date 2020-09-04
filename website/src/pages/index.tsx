import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { Container } from 'react-bootstrap';
import { NextComponentType, NextPageContext, GetServerSideProps } from "next";
import DefaultLayout from '../components/layouts/defaultlayout';

interface IProps {

}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const { query, req, res } = context

  let props: any

  props = {
  }
  
  // deletes undefined items in props
  Object.keys(props).forEach(key => {
    props[key] === undefined && delete props[key]
  })

	return {props: props}
}

const Home: NextComponentType<NextPageContext, any, IProps> = (props) => {

	return (
		<>
		<Head>
			<title>Index</title>
		</Head>
    <DefaultLayout>
      test test
    </DefaultLayout>
		</>
	)
}

export default Home