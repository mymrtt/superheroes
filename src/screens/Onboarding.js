// Libs
import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Images
import background from '../assets/wonder_woman.jpg';

// Components
import Input from '../components/Input';
import Button from '../components/Button';

// Services
import { createUser, login } from '../services/apiBack4App';

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

class Onboarding extends Component {
  state = {
    isCreateAccount: true,
    user: {
      username: '',
      email: '',
      password: '',
    },
    usernameError: false,
    emailError: false,
    passwordError: false,
    redirect: undefined,
    showPassword: false,
    error: undefined,
    isFetching: undefined,
  };

  fetchingCreateUserAccount = async (user) => {
    try {
      this.setState({
        isFetching: true,
      });

      const response = await createUser(user);

      if (response) {
        this.setState({
          isFetching: false,
          isCreateAccount: false,
        });
      }

      console.log('response create user api', response)
      
    } catch (error) {
      console.log('error', error);
      console.log('error response', error.response);

      const ErrorMessage = error.response.data.code;
      
      if (ErrorMessage === 202) {
				this.setState({
          error: 'Account already exists for this username.',
          isFetching: false,
				});
			} else if (ErrorMessage === 203) {
				this.setState({
          error: 'Account already exists for this email address.',
          isFetching: false,
				});
			} else {
        this.setState({
          error: 'Unknown error.',
          isFetching: false,
				});
      }
    }
  }

  fetchingUserLogin = async (user) => {
    try {
      this.setState({
        isFetching: true,
      });

      const response = await login(user.email, user.password);

      if (response) {
        this.setState({
          isFetching: false,
        });

        const deconstructing = response.data;

        localStorage.setItem('sessionToken', deconstructing.sessionToken);
        localStorage.setItem('username',  deconstructing.username);
        
        this.setState({
          redirect: '/dashboard',
        });
      }
    } catch (error) {
      this.setState({
        isFetching: false,
      });

      console.log('error', error);
      console.log('error response', error.response);

      const ErrorMessage = error.response.data.code;

      if (ErrorMessage === 101) {
        this.setState({
          error: 'Invalid username/password.',
        });
      } else {
        this.setState({
					error: 'Unknown error.',
				});
      }
    }
  }

  handleScreen = () => {
    this.setState({
      isCreateAccount: !this.state.isCreateAccount,
    });

    this.setState({
			usernameError: false,
      emailError: false,
      passwordError: false,
			user: {
				username: '',
				email: '',
				password: '',
			},
		});
  }

  handleSubmit = (event) => {
    const { user, isCreateAccount, usernameError, emailError, passwordError } = this.state;
    
    event.preventDefault();

    if (!usernameError && !emailError && !passwordError) {
      if (!isCreateAccount) {
        delete user.username;
        
        this.fetchingUserLogin(user);
      } else {
        this.fetchingCreateUserAccount(user);
      }
    }
  }

  handleChange = (field, ev) => {
    const { user } = this.state;

    user[field] = ev.target.value;

    if (field === 'username') {
      this.setState({
        usernameError: ev.target.value.length < 4,
      });
    }

    if (field === 'email') {
      this.setState({
        emailError: ev.target.value.length < 6,
      });
    }

    if (field === 'password') {
      this.setState({
        passwordError: ev.target.value.length < 6,
      });
    }

    this.setState({
      user,
    })
  }

  handleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  render() {
    const { isCreateAccount, user, usernameError, emailError, passwordError, redirect, error, isFetching } = this.state;

    return (
      <Container>
        <Content>
          <Form onSubmit={this.handleSubmit}>
            <Title>{isCreateAccount ? 'Sign up' : 'Sign in'}</Title>
              {isCreateAccount && (
                <Input
                  type="text"
                  label="Username"
                  inputWidthTablet="70%"
                  placeholder="Enter your username"
                  value={user.username}
                  onChange={(ev) => this.handleChange('username', ev)}
                  error={usernameError}
                />
              )}
              {usernameError && <ErrorMessage>Enter a valid username.</ErrorMessage>}
              <Input
                type="email" 
                label="Email"
                inputWidthTablet="70%"
                placeholder="you@exemple.com"
                value={user.email}
                onChange={(ev) => this.handleChange('email', ev)}
                error={emailError}
              />
              {emailError && <ErrorMessage>Enter a valid email.</ErrorMessage>}
                <Input
                  type={this.state.showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={(ev) => this.handleChange('password', ev)}
                  pass={true}
                  inputWidth="92%"
                  inputWidthTablet="75%"
                  wrapperWithTablet="70%"
                  borderBottom="transparent"
                  showPass={this.state.showPassword}
                  handleShowPassword={this.handleShowPassword}
                  error={passwordError}
                />
              {passwordError && <ErrorMessage>Enter a valid password.</ErrorMessage>}
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Button
                text={isCreateAccount ? 'Sign up' : 'Sign in'}
                isFetching={isFetching}
                tabletWith="70%"
              />
            <AnotherOptionText>
              {isCreateAccount ? (
                <Fragment>
                  Do you already have an account? <span onClick={this.handleScreen}>Sign in</span>
                </Fragment>
              ) : (
                <Fragment>
                  Don't have an account yet? <span onClick={this.handleScreen}>Sign up</span>
                </Fragment>
              )}
            </AnotherOptionText>
          </Form>
        </Content>
        <ContainerBg />
        {redirect && <Redirect exact to={redirect} />}
      </Container>
    )
  }
}

export default Onboarding;
