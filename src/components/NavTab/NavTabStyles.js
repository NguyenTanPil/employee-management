import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  @media only screen and (min-width: 768px) {
    border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};
  }
`;

export const NavTabItem = styled.li`
  background-color: transparent;
  margin-bottom: 1.2rem;

  button {
    letter-spacing: 0.05rem;
  }

  @media only screen and (min-width: 576px) {
    margin-bottom: -0.1rem;
  }
`;
