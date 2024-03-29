// Libs
import React from 'react'
import styled from 'styled-components'

// Images
import eyeOn from '../assets/eye.svg'
import eyeOff from '../assets/eye-off.svg'

// Styles
const Container = styled.div`
  width: ${({ containerWidth }) => containerWidth};
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: .3rem;
  color: #011627;
  display: ${(props) => props.search && 'none'};
`;

const Wrapper = styled.div`
  ${({ pass }) => pass && `
    width: 65%;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #eef1f2;
  `};

  @media(max-width: 768px) {
    width: ${({ wrapperWithTablet }) => wrapperWithTablet};
  }

  @media(max-width: 648px) {
    width: ${({ pass }) => pass && '100%'};
  }
`;

const DefaultInput = styled.input`
  margin-bottom: ${({ pass, error, heros}) => (!pass && !error && !heros) && '1rem'};
  padding: ${({ inputPadding }) => inputPadding || '1rem 0'};
  width: ${({ inputWidth }) => inputWidth || '65%'};
  border: none;
  color: ${({ theme }) => theme.input};
  border-bottom: ${({ borderBottom }) => borderBottom || '2px solid #eef1f2'};
  background: transparent;
  outline: none;

  @media(max-width: 768px) {
    width: ${({ inputWidthTablet }) => inputWidthTablet};
  }

  @media(max-width: 648px) {
    width: 100%;
  }
`;

const ShowPasswordIcon = styled.img`
  cursor: pointer;
`;

const Input = (props) => (
  <Container containerWidth={props.containerWidth}>
    <Label search={props.search}>{props.label}</Label>
    <Wrapper pass={props.pass} wrapperWithTablet={props.wrapperWithTablet}>
      <DefaultInput
        value={props.value}
        type={props.type}
        required={props.required}
        placeholder={props.placeholder}
        inputWidth={props.inputWidth}
        inputWidthTablet={props.inputWidthTablet}
        borderBottom={props.borderBottom}
        inputMarginBottomTablet={props.inputMarginBottomTablet}
        inputPadding={props.inputPadding}
        pass={props.pass}
        heros={props.heros}
        onChange={props.onChange}
        error={props.error}
        data-testid={props.testid}
      />
      {props.pass && (
        !props.showPass ? (
          <ShowPasswordIcon
            src={eyeOn}
            alt="eye on" 
            onClick={props.handleShowPassword}
          />
        ) : (
          <ShowPasswordIcon
            src={eyeOff}
            alt="eye off" 
            onClick={props.handleShowPassword}
          />
        )
      )}
    </Wrapper>
  </Container>
);

Input.defaultProps = {
	label: 'label',
	type: 'text',
	placeholder: 'Type here...',
	required: true,
};

export default Input;
