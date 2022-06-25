import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  & > div > span {
    border: 0.1rem solid ${(props) => props.theme.borderColor};
    border-radius: 0.4rem;
    padding: 0.8rem 1.2rem;
    width: 12rem;
  }

  & > ul {
    left: auto;
    right: 0;
    width: 120%;
  }
`;
