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
  background: ${({ background }) => background};
  cursor: pointer;

  @media(max-width: 768px) {
    width: ${({ tabletWith }) => tabletWith};
  }

  @media(max-width: 648px) {
    margin-top: 2rem;
    width: 100%;
  }
`;

const Text = styled.p`
  margin-right: .5rem;
  color: ${({ color }) => color};
`;

const Button = ({ 
  background,
  onClick,
  color,
  text,
  isFetching,
  tabletWith,
  testid,
  type
  }) => (
  <Default
    background={background}
    tabletWith={tabletWith}
    type={type}
    onClick={onClick}
    data-testid={testid}
  >
    <Text color={color}>
      {text}
    </Text>
    {isFetching && <img src={loaderWhite} alt="loading..." />}
  </Default>
);

Button.defaultProps = {
  text: 'text',
  color: '#fff',
  background: '#842219'
};

export default Button;
