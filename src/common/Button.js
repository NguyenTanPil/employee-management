import styled, { css, keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';

const rippleAnimation = keyframes` 
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

const getBackgroundColor = (props) => {
  let backgroundColor = props.theme.backgroundColor;

  if (props.active) {
    backgroundColor = props.theme.buttonBackgroundColor;
  }

  if (props.active && props.danger) {
    backgroundColor = props.theme.errorColor;
  }

  if (props.active && props.success) {
    backgroundColor = props.theme.successColor;
  }

  if (props.active && props.warning) {
    backgroundColor = props.theme.warningColor;
  }

  return backgroundColor;
};

const getBackgroundColorHover = (props) => {
  let backgroundColor = 'transparent';

  if (props.active) {
    backgroundColor = props.theme.backgroundColor;
  }

  return backgroundColor;
};

const getFontColor = (props) => {
  let fontColor = props.theme.buttonBackgroundColor;

  if (props.active) {
    fontColor = props.theme.backgroundColor;
  }

  if (props.danger) {
    fontColor = props.theme.errorColor;
  }

  if (props.success) {
    fontColor = props.theme.successColor;
  }

  if (props.active && props.danger) {
    fontColor = props.theme.backgroundColor;
  }

  if (props.active && props.success) {
    fontColor = props.theme.backgroundColor;
  }

  if (props.active && props.warning) {
    fontColor = props.theme.fontColor;
  }

  return fontColor;
};

const getColorHover = (props) => {
  let colorHover = props.theme.hoverColor;

  if (props.active) {
    colorHover = props.theme.buttonBackgroundColor;
  }

  if (props.active && props.danger) {
    colorHover = props.theme.errorColor;
  }

  return colorHover;
};

function getColorStyle(props) {
  return {
    backgroundColor: getBackgroundColor(props),
    backgroundColorHover: getBackgroundColorHover(props),
    fontColor: getFontColor(props),
    colorHover: getColorHover(props),
    type: 'button',
  };
}

const ButtonPattern = css`
  border-radius: 0.4rem;
  cursor: pointer;
  display: inline-block;
  font-size: 1.4rem;
  font-weight: 600;
  outline: none;
  padding: 0.8rem 1.2rem;
  text-transform: capitalize;
  transition: all 0.2s ease;
`;

const IconButtonPattern = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  padding: 0.8rem;
`;

const Button = styled.button.attrs((props) => ({
  cursorType: props.disabled ? 'default' : 'pointer',
  opacityValue: props.disabled ? 0.52 : 1,
  pointerEvents: props.disabled ? 'none' : 'auto',
}))`
  ${ButtonPattern};
  cursor: ${(props) => props.cursorType};
  opacity: ${(props) => props.opacityValue};
  pointer-events: ${(props) => props.pointerEvents};
`;

export const TextButton = styled(Button).attrs((props) => getColorStyle(props))`
  background-color: ${(props) => props.backgroundColor};
  border: 0.2rem solid ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};

  &:hover {
    background-color: ${(props) => props.backgroundColorHover};
    color: ${(props) => props.colorHover};
  }
`;

export const NavButton = styled(TextButton).attrs((props) => ({
  borderBottomColor: props.isActive
    ? props.theme.backgroundColor
    : 'transparent',
  borderRestColor: props.isActive ? props.theme.borderColor : 'transparent',
}))`
  background-color: transparent;
  border-bottom-color: ${(props) => props.borderRestColor};
  border-left-color: ${(props) => props.borderRestColor};
  border-right-color: ${(props) => props.borderRestColor};
  border-top-color: ${(props) => props.borderRestColor};
  border-radius: 0.4rem;
  border-style: solid;
  border-width: 0.1rem;
  color: ${(props) =>
    props.isActive
      ? props.theme.buttonBackgroundColor
      : props.theme.hoverColor};
  font-size: 1.6rem;
  padding: 1.2rem 1.6rem;
  text-transform: uppercase;
  transition: border-color 0.2s ease;

  &:hover {
    color: ${(props) => props.theme.buttonBackgroundColor};
  }

  @media only screen and (min-width: 768px) {
    border-bottom-color: ${(props) => props.borderBottomColor};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: ${(props) => (props.isActive ? '0.4rem' : '0')};
    border-top-right-radius: ${(props) => (props.isActive ? '0.4rem' : '0')};
  }
`;

export const OriginTextButton = styled(Button).attrs((props) =>
  getColorStyle(props)
)`
  background-color: ${(props) => props.backgroundColor};
  border: 0.2rem solid ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
  cursor: auto;
`;

export const LinkButton = styled(NavLink)`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 0.2rem solid ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.buttonBackgroundColor};
  ${ButtonPattern};

  &:hover {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.hoverColor};
  }

  &.active {
    background-color: ${(props) => props.theme.buttonBackgroundColor};
    border-color: ${(props) => props.theme.buttonBackgroundColor};
    color: ${(props) => props.theme.backgroundColor};

    &:hover {
      background-color: ${(props) => props.theme.backgroundColor};
      color: ${(props) => props.theme.buttonBackgroundColor};
    }
  }
`;

export const IconLinkButton = styled(LinkButton)`
  ${IconButtonPattern};
  padding-bottom: 0;
  padding-top: 0;
`;

export const IconButton = styled(TextButton)`
  ${IconButtonPattern};
  padding-bottom: ${(props) => props.pb || '0.8rem'};
  padding-top: ${(props) => props.pt || '0.8rem'};

  &:last-child {
    padding-right: ${(props) => (props.active ? '0.8rem' : '0')};

    @media only screen and (min-width: 576px) {
      padding-right: 0.8rem;
    }
  }
`;

export const SearchButton = styled(IconButton)`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.fontColor};
  font-size: 1.6rem;

  &:hover {
    color: ${(props) => props.theme.fontColor};
  }
`;

export const PageButton = styled(Button).attrs((props) => ({
  backgroundColor: props.active
    ? props.theme.buttonBackgroundColor
    : 'transparent',
  fontColor: props.active ? '#ffffff' : props.theme.buttonBackgroundColor,
}))`
  background-color: ${(props) => props.backgroundColor};
  border: 0.1rem solid rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  color: ${(props) => props.fontColor};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  letter-spacing: 0.01071rem;
  line-height: 1.43;
  height: 3.6rem;
  min-width: 3.6rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  overflow: hidden;
  position: relative;
  text-align: center;
  transition: all 400ms;
  user-select: none;

  svg {
    display: inline-block;
    flex-shrink: 0;
    fill: currentColor;
    font-size: 1.5rem;
    font-size: 1.25rem;
    height: 2.4rem;
    margin: 0 -0.8rem;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
    width: 2.4rem;
  }

  span {
    animation: ${rippleAnimation} 600ms linear;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    position: absolute;
    transform: scale(0);
  }
`;
