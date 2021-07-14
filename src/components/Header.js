// Libs
import React, { useState } from 'react'
import styled from 'styled-components'
import { NavLink, Redirect } from 'react-router-dom'

// Images
import apertureIcon from '../assets/aperture.svg'
import hamburgerMenuOpen from '../assets/menu.svg'
import hamburgerMenuClose from '../assets/x.svg'
import userIcon from '../assets/user.svg'

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
    box-shadow: 1px 1px 4px 0px #5f0f08;
  }
`;

const Content = styled.div`
  position: fixed;
  width: inherit;
  height: -webkit-fill-available;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: 1px 1px 4px 0px #5f0f08;
  border-radius: 0;

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
    margin-top: 5rem;
    height: 5rem;
  }

  @media(max-width: 648px) {
    display: none;
  }
`;

const MobileMenu = styled.img`
  display: none;

  @media(max-width: 648px) {
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
    display: ${({ display }) => display ? 'flex' : 'none'};
    background-color: ${({ theme }) => theme.body};
    z-index: 3;
  }
`;

const ContainerLinks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media(max-width: 648px) {
    box-shadow: 1px 1px 4px 0px #5f0f08;
  }
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
    margin-bottom: ${({ lastOne }) => !lastOne && '.5rem'};
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
  display: ${({ menu }) => menu ? 'none' : 'flex'};
  padding: 1rem 2rem;
  justify-content: center;
  align-items: center;

  ${({ user }) => !user && (
    `
    cursor: pointer;

    &:hover {
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

  @media(max-width: 648px) {
    margin: ${({ menu }) => menu && '0'};
    display: flex;
  }
`;

const Text = styled.p`
  margin: .5rem;
  color: ${({ theme }) => theme.text};

  ${(props) => props.username && `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `};
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
    const username = dataName && (dataName?.[0].toUpperCase() + dataName.slice(1).toLowerCase());

    return (
      <ContainerMenu>
        <ContainerMenuItem user>
          <img src={userIcon} alt="user" />
          <Text username>{username}</Text>
        </ContainerMenuItem>
        <ContainerMenuItem
          onClick={handleLogout}
          data-testid="logout-button"
        >
          <Text>Sair</Text>
        </ContainerMenuItem>
      </ContainerMenu>
    );
  };

  const renderLinks = () => (
    <ContainerLinks>
      <Link
        exact to="/superheroes"
        activeClassName="active"
        lastOne
      >
        Super Heroes
      </Link>
      <ContainerMenuItem
        menu
        onClick={handleLogout}
      >
        <Text>Logout</Text>
      </ContainerMenuItem>
    </ContainerLinks>
  );

  return (
    <Container>
      <Content>
        <Logo src={apertureIcon} alt="logo" />
        {!isMobileMenuShowing ? (
          <MobileMenu
            src={hamburgerMenuOpen}
            alt="menu"
            onClick={handleMobileMenu}
          />
        ) : (
          <MobileMenu
            src={hamburgerMenuClose}
            alt="menu"
            onClick={handleMobileMenu}
          />
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
