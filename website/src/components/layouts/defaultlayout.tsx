import React from 'react';
import Header from './header';
import Footer from './footer';
import { Container } from 'react-bootstrap';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Container className="pb-5">
        <Header />
      </Container>
      <Container>
          {children}
      </Container>
      <Footer />
      </>
  );
}

export default DefaultLayout;