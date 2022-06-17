import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-bottom: 1.2rem;
  padding-top: 1.2rem;
  width: 100%;

  svg {
    color: ${(props) => props.theme.fontColor};
  }

  span {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.6rem;
    font-weight: 600;
    margin-top: 0.8rem;
  }
`;
