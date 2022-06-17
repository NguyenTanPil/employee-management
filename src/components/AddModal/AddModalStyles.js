import styled from 'styled-components';

export const ModalTitle = styled.h3.attrs((props) => ({
  titleColor: props.fontColor
    ? props.fontColor
    : props.theme.buttonBackgroundColor,
}))`
  color: ${(props) => props.titleColor};
  font-size: ${(props) => props.fontSize + 'rem'};
  font-weight: 600;
  margin: 0;
  text-transform: capitalize;
`;
