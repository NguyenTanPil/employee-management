import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.6rem;
  width: 100%;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;

  img {
    height: 4rem;
  }

  & > span {
    color: ${(props) => props.theme.titleColor};
    display: none;
    font-size: 1.5rem;
    font-weight: 600;
    margin-left: 1.2rem;

    @media only screen and (min-width: 576px) {
      display: inline-block;
    }
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-left: 1.2rem;
  }

  & a:first-child {
    margin-left: 0;
  }
`;
