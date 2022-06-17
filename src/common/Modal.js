import styled from 'styled-components';

export const ModalContainer = styled.div`
  background-color: rgba(91, 112, 131, 0.4);
  cursor: default;
  display: block;
  overflow: auto;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  transition: transform 0.4s ease-in;
  transform: ${(props) =>
    props.isShow ? 'translateY(0%)' : 'translateY(-100%)'};
  transform-origin: ${(props) => (props.isShow ? 'left top' : 'left bottom')};
  z-index: 2000;
`;

export const ModalContent = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: auto;
  max-width: 90vw;

  & > div {
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 1.2rem;
    width: 100%;
  }

  @media only screen and (min-width: 576px) {
    max-width: 52rem;
  }
`;

export const ModalHeader = styled.div.attrs((props) => ({
  headerBackgroundColor: props.backgroundColor
    ? props.backgroundColor
    : props.theme.backgroundColor,
}))`
  background-color: ${(props) => props.headerBackgroundColor};
  border-top-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) => props.mt + 'rem'};
  padding: 2.4rem 1.6rem ${(props) => props.pb + 'rem'} 1.6rem;
`;

export const ModalBody = styled.div`
  padding: 0 ${(props) => props.px + 'rem'} 2.4rem;

  p {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: 0.1rem;
    margin: 0;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: ${(props) => (props.pb || 0) + 'rem'};
  padding-left: ${(props) => (props.pl || 0) + 'rem'};
  padding-right: ${(props) => (props.pr || 0) + 'rem'};
  padding-top: ${(props) => (props.pt || 0) + 'rem'};

  & > button {
    margin-left: 1.2rem;
  }
`;
