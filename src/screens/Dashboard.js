// Libs
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import Layout from '../components/layout';

// Images
import alertIcon from '../assets/alert-triangle.svg';

// Styles
const Container = styled.div`
  width: 80%;
  height: 80vh;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;

  @media(max-width: 648px) {
    width: 100%;
  }
`;

const Alert = styled.img`
  margin: 2rem;
  width: 3rem;
`;

const Text = styled.p`
  font-weight: 600;
`;

class Dashboard extends Component {
  state = {
  }

  render() {
    return (
      <Layout>
        <Container>
          <Alert src={alertIcon} alt="alert" />
          <Text>Under construction.</Text>
          <Alert src={alertIcon} alt="alert" />
        </Container>
      </Layout>
    )
  }
}

export default Dashboard;
