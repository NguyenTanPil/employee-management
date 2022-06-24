import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  body {
    background-color: ${(props) => props.theme.backgroundColor};
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding-left: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }

  input[type='number']::-webkit-outer-spin-button,
    &[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
`;
