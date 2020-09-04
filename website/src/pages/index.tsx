import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { NextComponentType, NextPageContext, GetServerSideProps } from "next";
import ProductsService from '../service/products';
import ProductDto from '../shared/dto/Product';
import ProductsContainer from '../components/browse-product/containers/ProductsContainer';
import FilterContainer from '../components/browse-product/containers/FilterContainer';

interface IProps
 {
	products: ProductDto[],
  categories: string[],      
  selectedCategory?: string,
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
  const { query, req, res } = context

	const products = query.category ? await ProductsService.getProductsByCategory(query.category as string) : await ProductsService.getAllProducts();
  const categories = await ProductsService.getCategories();
  
  let props: any

  props = {
      products: products,
      categories: categories,
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
			<title>Products</title>
		</Head>
    <FilterContainer categories={props.categories} selectedCategory={props.selectedCategory}/>
    <ProductsContainer products={props.products}/>
		</>
	)
}

export default Home