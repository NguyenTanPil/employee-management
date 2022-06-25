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
  position: relative;
  width: 60%;

  &:hover {
    & > div {
      display: flex;
    }
  }

  img {
    border-radius: 0.8rem;
    display: block;
    max-width: 24rem;
    width: 100%;
  }

  @media only screen and (min-width: 576px) {
    width: 100%;
  }
`;

export const OverlayAvatar = styled.div`
  background-color: rgba(91, 112, 131, 0.4);
  border-radius: 0.4rem;
  display: none;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;

  button {
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 50%;
    font-size: 2rem;

    &:hover {
      background-color: ${(props) => props.theme.buttonBackgroundColor};
      border-color: ${(props) => props.theme.buttonBackgroundColor};
      color: ${(props) => props.theme.backgroundColor};
    }
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
