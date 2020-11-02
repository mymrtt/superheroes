// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';

// Styles
const Container = styled.div`
  width: 80%;
  height: 100vh;
  display: flex;

  @media(max-width: 648px) {
    width: 100%;
  }
`;

class Dashboard extends Component {
  state = {
  }

  render() {
    return (
      <Layout>
        <Container>
          <p>a</p>
        </Container>
      </Layout>
    )
  }
}

export default Dashboard;
