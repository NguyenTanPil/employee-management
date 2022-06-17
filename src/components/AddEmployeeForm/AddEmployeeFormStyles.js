import styled from 'styled-components';

export const InputGroup = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    width: 100%;

    @media only screen and (min-width: 576px) {
      width: calc(50% - 0.4rem);
    }
  }
`;
