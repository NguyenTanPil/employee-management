import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const TextLink = styled(Link)`
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.buttonBackgroundColor};
  }
`;

export const TextCursorActive = styled.span.attrs((props) => ({
  fontColor: props.active
    ? props.theme.buttonBackgroundColor
    : props.theme.fontColor,
}))`
  color: ${(props) => props.fontColor};
  cursor: pointer;
`;
