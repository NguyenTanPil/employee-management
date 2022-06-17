import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -1.2rem;

  input {
    max-width: 24rem;
  }

  @media only screen and (min-width: 576px) {
    margin-top: 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    input {
      max-width: 32rem;
    }
  }
`;

export const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &:focus-within {
    button {
      color: ${(props) => props.theme.buttonBackgroundColor};
    }
  }

  button {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  input {
    padding-left: 3.2rem;
  }
`;
