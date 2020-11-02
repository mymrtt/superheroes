// Libs
import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, Redirect } from 'react-router-dom';

// Images
import apertureIcon from '../assets/aperture.svg';
import hamburgerMenuOpen from '../assets/menu.svg';
import hamburgerMenuClose from '../assets/x.svg';
import userIcon from '../assets/user.svg';

// Styles
const Container = styled.header`
  width: 20%;
  display: flex;
  justify-content: center;

  @media(max-width: 768px) {
    width: 25%;
    max-width: 25%;
  }

  @media(max-width: 648px) {
    width: 100%;
    min-width: 100%;
    height: 5rem;
    box-shadow: 5px 1px 5px;
  }
`;

const Content = styled.div`
  position: fixed;
  width: inherit;
  height: -webkit-fill-available;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 10px;

  @media(max-width: 648px) {
    position: inherit;
    height: 5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Logo = styled.img`
  margin: 4rem;
  height: 6rem;

  @media(max-width: 768px) {
    margin: 2rem;
    height: 5rem;
  }

  @media(max-width: 648px) {
    display: none;
  }
`;

const MobileMenu = styled.img`
  display: none;

  @media(max-width: 648px) {
    ${'' /* position: relative; */}
    margin-left: .5rem;
    height: 2rem;
    display: flex;
  }
`;

const WrapperLinks = styled.div`
  padding: 0 .5rem;
  min-height: 60vh;
  display: flex;
  align-items: baseline;

  @media(max-width: 768px) {
    padding: 0;
    min-height: 50vh;
  }

  @media(max-width: 648px) {
    position: absolute;
    top: 5rem;
    left: 0;
    min-height: max-content;
    display: ${(props) => props.display ? 'flex' : 'none'};
    z-index: 3;
    background-color: ${({ theme }) => theme.body};
  }
`;

const ContainerLinks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Link = styled(NavLink)`
  padding: 1rem;
  margin: 1rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  text-align: center;

  &.active, :hover {
    color: #fff;
    background-color: ${({ theme }) => theme.text};
    font-weight: bold;
  }

  @media(max-width: 1024px) {
    padding: 1rem;
    margin: 0;
    margin-bottom: ${(props) => !props.lastOne && '.5rem'};
  }
`;

const ContainerMenu = styled.div`
  display: flex;
  border-radius: 10px;
  
  @media(max-width: 1024px) {
    padding: 0 .5rem;
    flex-direction: column;
  }

  @media(max-width: 648px) {
    display: none;
  }
`; 

const ContainerMenuItem = styled.div`
  width: 50%;
  display: flex;
  padding: 1rem 2rem;
  justify-content: center;
  align-items: center;
  border-bottom: ${(props) => props.user && '0.1px solid #fff'};
  cursor: ${(props) => !props.user && 'pointer'};

  ${(props) => !props.user && (
    `&:hover {
      background-color: #842219;

      p {
        color: #fff;
      }
    }`
  )}

  @media(max-width: 1024px) {
    margin-bottom: 1rem;
    padding: .5rem;
    width: 100%;
    justify-content: flex-start;
  }
`;

const Text = styled.p`
  margin: .5rem;
  color: ${({ theme }) => theme.text};
  white-space: ${(props) => props.username && 'nowrap'};; 
  overflow: ${(props) => props.username && 'hidden'};
  text-overflow: ${(props) => props.username && 'ellipsis'};
`;

const Header = () => {
  const [redirect, setRedirect] = useState(undefined);
  const [isMobileMenuShowing, setIsMobileMenuShowing] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('sessionToken');

    setRedirect('/');
  }

  const handleMobileMenu = () => {
    setIsMobileMenuShowing(!isMobileMenuShowing);
  }

  const renderMenu = () => {
    const dataName = localStorage.getItem('username');
    const username = dataName[0].toUpperCase() + dataName.slice(1).toLowerCase();

    return (
      <ContainerMenu>
        <ContainerMenuItem user>
          <img src={userIcon} alt="user" />
          <Text username>{username}</Text>
        </ContainerMenuItem>
        <ContainerMenuItem onClick={handleLogout}>
          <Text>Sair</Text>
        </ContainerMenuItem>
      </ContainerMenu>
    );
  };

  const renderLinks = () => (
    <ContainerLinks>
      <Link
        exact to="/dashboard"
        activeClassName="active"
      >
        Dashboard
      </Link>
      <Link
        exact to="/superheroes"
        activeClassName="active"
        lastOne
      >
        Super Heroes
      </Link>
    </ContainerLinks>
  );

  return (
    <Container>
      <Content>
        <Logo src={apertureIcon} alt="logo" />
        {!isMobileMenuShowing ? (
          <MobileMenu src={hamburgerMenuOpen} alt="menu" onClick={handleMobileMenu} />
        ) : (
          <MobileMenu src={hamburgerMenuClose} alt="menu" onClick={handleMobileMenu} />
        )}
        
        <WrapperLinks display={isMobileMenuShowing}>
          {renderLinks()}
        </WrapperLinks>
        {renderMenu()}
      </Content>
      {redirect && <Redirect to={redirect} />}
    </Container>
  )
};

export default Header;
