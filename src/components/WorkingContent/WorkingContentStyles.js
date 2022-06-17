import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  width: 100%;
`;

export const ContentTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  h3 {
    color: ${(props) => props.theme.titleColor};
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    margin: 0;
    text-transform: uppercase;
  }
`;
