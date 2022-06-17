import styled from 'styled-components';

export const SideNavTab = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 2.4rem;
`;

export const LeftSide = styled.div`
  display: flex;
  margin-bottom: 3.2rem;
  width: 100%;

  @media only screen and (min-width: 576px) {
    flex-direction: column;
    width: 20%;
  }
`;

export const Avatar = styled.div`
  width: 60%;

  img {
    max-width: 24rem;
    border-radius: 0.8rem;
    width: 100%;
  }

  @media only screen and (min-width: 576px) {
    width: 100%;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
  flex-wrap: wrap;
  flex-grow: 1;

  button {
    margin: 0.6rem 0.8rem;
  }

  @media only screen and (min-width: 576px) {
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }
`;

export const RightSide = styled.div`
  width: 100%;

  @media only screen and (min-width: 576px) {
    width: 76%;
  }
`;

export const TabContentContainer = styled.ul`
  width: 100%;
`;

export const TabContentItem = styled.li`
  box-sizing: border-box;
  display: ${(props) => (props.active ? 'block' : 'none')};
  margin-top: 2.4rem;
  width: 100%;
`;
