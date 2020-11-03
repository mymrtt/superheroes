// Libs
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components';

// Components
import Header from '../Header';
import { lightTheme, darkTheme } from '../../style/theme';
import GlobalTheme from '../../style/global';

// Images
import moonIcon from '../../assets/moon.svg';
import sunIcon from '../../assets/sun.svg';

// Styles
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media(max-width: 648px) {
    flex-direction: column;
  }
`;

const ContainerImageTheme = styled.figure`
  width: 100%;
  position: fixed;

  @media(max-width: 648px) {
    position: absolute;
    width: auto;
    align-self: flex-end;
  }
`;

const ImageTheme = styled.img`
  padding: .5rem;
  width: 3rem;
  cursor: pointer;
`;

function Layout ({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Container>
        <Header />
        <GlobalTheme />
        {theme === 'light' ? (
          <ContainerImageTheme>
            <ImageTheme src={sunIcon} onClick={toggleTheme} />
          </ContainerImageTheme>
        ) : (
          <ContainerImageTheme>
            <ImageTheme src={moonIcon} onClick={toggleTheme} />
          </ContainerImageTheme>
        )}
        {children}
      </Container>
    </ThemeProvider>
  )
}

export default Layout;

