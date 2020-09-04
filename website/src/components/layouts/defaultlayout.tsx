import React from 'react';
import Header from './header';
import Footer from './footer';
import { Container } from 'react-bootstrap';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
          {children}
      </Container>
      <Footer />
      </>
  );
}

export default DefaultLayout;