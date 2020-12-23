// Libs
import React from 'react'
import styled from 'styled-components'

// Images
import loaderWhite from '../assets/loader-white.svg'

// Styles
const Default = styled.button`
  margin-top: 1rem;
  width: 65%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: .95rem;
  border-radius: 10px;
  border: none;
  background: ${(props) => props.background};
  cursor: pointer;

  @media(max-width: 768px) {
    width: ${(props) => props.tabletWith};
  }

  @media(max-width: 648px) {
    margin-top: 2rem;
    width: 100%;
  }
`;

const Text = styled.p`
  color: ${(props) => props.color};
  margin-right: .5rem;
`;

const Button = ({ background, onClick, color, text, isFetching, tabletWith, testid, type }) => (
  <Default
    background={background}
    tabletWith={tabletWith}
    onClick={onClick}
    type={type}
    data-testid={testid}
  >
    <Text color={color}>
      {text}
    </Text>
    {isFetching ? <img src={loaderWhite} alt="loading..." /> : null}
  </Default>
);

Button.defaultProps = {
  text: 'text',
  color: '#fff',
  background: '#842219'
};

export default Button;
