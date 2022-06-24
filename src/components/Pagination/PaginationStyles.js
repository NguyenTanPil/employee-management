import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 2rem;

  & > div {
    margin-bottom: 0;
  }
`;

export const PageNumberList = styled.ul`
  display: flex;
  align-items: center;
  margin-top: 2rem;
`;
