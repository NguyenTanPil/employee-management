import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 2.4rem;

  & > div {
    position: relative;
  }

  & span {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 1rem;
    margin: calc(0.5rem * 0.75 + 0.75rem) calc(0.1rem * 0.5);
    padding: calc(0.5rem * 0.75) calc(0.1rem * 0.5);
    position: absolute;
    bottom: 0;
    left: 0rem;
    text-transform: capitalize;
    transform: translateX(0, 0);
    transform-origin: 0 0;
    transition: transform 120ms ease-in;
    white-space: nowrap;
    z-index: 1000;
  }

  input {
    background-color: transparent;
    border: 0;
    border-bottom: 0.2rem solid ${(props) => props.theme.borderColor};
    box-sizing: border-box;
    color: ${(props) => props.theme.fontColor};
    font-size: 1.6rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
    outline: none;
    padding: 1.2rem 1.6rem 0.8rem 0;
    position: relative;
    z-index: 2000;
    width: 100%;

    &[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus,
    :not(:placeholder-shown) {
      & + span {
        transform: translate(-0.2rem, -1.88rem) scale(0.8);
        color: ${(props) => props.theme.buttonBackgroundColor};
        z-index: 2000;
      }
    }

    &[type='date'] {
      max-height: 4rem;
      font-size: 1.5rem;
      font-weight: 400;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: ${(props) => props.theme.errorColor};
  font-size: 1.2rem;
  font-weight: 400;
  margin-top: 0.4rem;
`;
