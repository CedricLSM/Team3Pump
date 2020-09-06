import React from 'react';
import { NextComponentType, NextPageContext, GetServerSideProps } from 'next'
import DefaultLayout from '../../components/layouts/defaultlayout';
import ArticleService from '../../services/article';
import { Row } from 'react-bootstrap';

interface IProps {
    articles?: any[]
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
    const { query, req, res } = context
    
    const result = await ArticleService.getAllArticles();
    
    let props: any
  
    props = {
      articles: result
    }

    // deletes undefined items in props
    Object.keys(props).forEach(key => {
      props[key] === undefined && delete props[key]
    })
  
    return {props: props}
  }

const Learn: NextComponentType<NextPageContext, any, IProps> = (props: IProps) => {

    console.log(props);

    return (
        <div className="container">
            <DefaultLayout>
                <h1>Articles: </h1>
                {props.articles.map((a) => {
                    return <Row className="pl-3 pb-3">
                        <a href={`/learn/${a.articleId}`}>{a.articleName}</a>
                        </Row>
                })}
            </DefaultLayout>
        </div>
    );
}

export default Learn;
