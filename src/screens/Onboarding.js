// Libs
import React, { useState } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

// Images
import background from '../assets/wonder_woman.jpg'

// Components
import Input from '../components/Input'
import Button from '../components/Button'

// Services
import { createUser, login } from '../services/apiBack4App'

// Styles
const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ContainerBg = styled.aside`
  width: 50%;
  background-image: url(${background});
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;

  @media(max-width: 648px) {
    display: none;
  }
`;

const Content = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media(max-width: 648px) {
    padding: 0 3rem;
    width: 100%;
  }
`;

const Form = styled.form`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-self: flex-end;

  @media(max-width: 768px) {
    width: 80%;
  }

  @media(max-width: 648px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  margin-bottom: 3rem;
  font-size: 2.5rem;
`;

const AnotherOptionText = styled.p`
  margin-top: 2rem;
  width: fit-content;

  span {
    color: #842219;
    font-weight: 500;
    border-bottom: 1px solid #842219;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  margin: .5rem 0;
  color: tomato;
  font-size: .8rem;
  font-weight: 800;

  @media(max-width: 648px) {
    margin-bottom: .9rem;
  }
`;

const Onboarding = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(true);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(undefined);
  const [errorText, setErrorText] = useState(undefined);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isFetching, setIsFetching] = useState(undefined);

  const fetchingCreateUserAccount = async (user) => {
    try {
      setIsFetching(true);

      const response = await createUser(user);

      if (response) {
        setIsFetching(false);
        setIsCreateAccount(false);
      }      
    } catch (error) {

      const { code } = error.response.data.code;
      
      if (code === 202) {
        setErrorText('Account already exists for this username.')
    		} 
      
      if (code === 203) {
        setErrorText('Account already exists for this email address.')
    		} 

      setErrorText('Unknown error');
      setIsFetching(false);
    }
  }

  const fetchingUserLogin = async (user) => {
    try {
      setIsFetching(true);

      const response = await login(user.email, user.password);

      if (response) {
        setIsFetching(false);

        const { data } = response;

        localStorage.setItem('sessionToken', data.sessionToken);
        localStorage.setItem('username',  data.username);
        
        setRedirect('/superheroes');
      }
    } catch (error) {
      setIsFetching(false);

      const { code } = error.response.data;

      if (code === 101) {
        setErrorText('Invalid username/password.');
      } 

      setErrorText('Unknown error.');
    }
  }

  const handleScreen = () => {
    setIsCreateAccount(!isCreateAccount);
    setUsernameError(false);
    setEmailError(false);
    setPasswordError(false);
    setUser({
      username: '',
      email: '',
      password: ''
    });
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (!usernameError && !emailError && !passwordError) {
      if (!isCreateAccount) {
        delete user.username;
        
        fetchingUserLogin(user);
      } else {
        fetchingCreateUserAccount(user);
      }
    }
  }

  const handleChange = (field, ev) => {
    user[field] = ev.target.value;

    if (field === 'username') {
      setUser({
        ...user,
        username: ev.target.value
      });
      setUsernameError(ev.target.value.length < 4);
    }

    if (field === 'email') {
      setUser({
        ...user,
        email: ev.target.value
      });
      setEmailError(ev.target.value.length < 6);
    }

    if (field === 'password') {
      setUser({
        ...user,
        password: ev.target.value,
      });
      setPasswordError(ev.target.value.length < 6);
    }
  }

  return (
    <Container>
      <Content>
        <Form onSubmit={handleSubmit} id="login-submit">
          <Title>{isCreateAccount ? 'Sign up' : 'Sign in'}</Title>
            {isCreateAccount && (
              <>
                <Input
                  type="text"
                  label="Username"
                  inputWidthTablet="70%"
                  placeholder="Enter your username"
                  value={user.username}
                  onChange={(ev) => handleChange('username', ev)}
                  error={usernameError}
                />
                {usernameError && <ErrorMessage>Enter a valid username.</ErrorMessage>}
              </>
            )}
            <Input
              type="email" 
              label="Email"
              inputWidthTablet="70%"
              placeholder="you@exemple.com"
              value={user.email}
              onChange={(ev) => handleChange('email', ev)}
              error={emailError}
              testid="signin-email"
            />
            {emailError && <ErrorMessage>Enter a valid email.</ErrorMessage>}
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(ev) => handleChange('password', ev)}
              pass={true}
              inputWidth="92%"
              inputWidthTablet="75%"
              wrapperWithTablet="70%"
              borderBottom="transparent"
              showPass={showPassword}
              handleShowPassword={() => setShowPassword(!showPassword)}
              error={passwordError}
              testid="signin-password"
            />
            {passwordError && <ErrorMessage>Enter a valid password.</ErrorMessage>}
            {errorText && <ErrorMessage>{errorText}</ErrorMessage>}
            <Button
              text={isCreateAccount ? 'Sign up' : 'Sign in'}
              isFetching={isFetching}
              tabletWith="70%"
              type="submit"
            />
          <AnotherOptionText>
            {isCreateAccount ? (
              <>
                Do you already have an account? <span onClick={handleScreen} data-testid="signin-screen">Sign in</span>
              </>
            ) : (
              <>
                Don't have an account yet? <span onClick={handleScreen}>Sign up</span>
              </>
            )}
          </AnotherOptionText>
        </Form>
      </Content>
      <ContainerBg />
      {redirect && <Redirect exact to={redirect} />}
   </Container>
  )
}

export default Onboarding;