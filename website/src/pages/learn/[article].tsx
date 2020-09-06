import React from 'react';
import { NextComponentType, NextPageContext, GetServerSideProps } from 'next';
import ArticleService from '../../services/article';
import DefaultLayout from '../../components/layouts/defaultlayout';
import { Container } from 'react-bootstrap';

interface IProps {
    article?: any
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
    const { query, req, res } = context

    const articleId = query.article as string;
    
    const result = await ArticleService.getArticle(parseInt(articleId));
    
    let props: any
  
    props = {
      article: result
    }

    // deletes undefined items in props
    Object.keys(props).forEach(key => {
      props[key] === undefined && delete props[key]
    })
  
    return {props: props}
  }
const Learn: NextComponentType<NextPageContext, any, IProps> = (props: IProps) => {

    return (
        <DefaultLayout>
            <Container>
                <h1>
                    {props.article.articleName}
                </h1>
                <sub>
                    {props.article.created_at}
                </sub>
                <hr />
                <div>
                    {props.article.articleBody}
                </div>
            </Container>
        </DefaultLayout>
    );
}

export default Learn;
