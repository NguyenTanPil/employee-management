import styled, { css, keyframes } from 'styled-components';

const jelly = keyframes` 
  0% {
     transform: translateY(-50%) scale3d(1,1,1);
  }
  30% {
    transform: translateY(-50%) scale3d(.75,1.25,1);
  }
  40% {
    transform: translateY(-50%) scale3d(1.25,.75,1) ;
  }
  50% {
     transform: translateY(-50%) scale3d(.85,1.15,1);
  }
  65% {
    transform: translateY(-50%) scale3d(1.05,.95,1);
  }
  75% {
    transform: translateY(-50%) scale3d(.95,1.05,1);
  }
  100% {
    transform: translateY(-50%) scale3d(1,1,1) ;
  }
`;

const jellyAnimation = () =>
  css`
    animation: ${jelly} 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `;

export const TextInput = styled.input`
  background-color: transparent;
  box-sizing: border-box;
  color: ${(props) => props.theme.fontColor};
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  outline: none;
  padding: 0.8rem 1.6rem;
  transition: all 0.2s ease;
  width: 50rem;

  &:focus {
    border-color: ${(props) => props.theme.buttonBackgroundColor};
    // opacity: 30% = 4C
    box-shadow: 0 0 0 0.25rem
      ${(props) => props.theme.buttonBackgroundColor + '4C'};
  }
`;

export const CheckBox = styled.div.attrs((props) => ({
  borderColor: props.active
    ? props.theme.buttonBackgroundColor
    : props.theme.pageButtonColor,
  transformAfter: props.active
    ? 'translateY(-50%) scale(0.4)'
    : 'translateY(-50%) scale(0)',
}))`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 1.4rem;
  position: relative;
  width: 1.4rem;

  &:after,
  &:before {
    border: 0.1rem solid ${(props) => props.borderColor};
    border-radius: 0.24rem;
    box-sizing: border-box;
    content: '';
    height: 100%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s ease;
    width: 100%;
  }

  &:after {
    background-color: ${(props) => props.theme.buttonBackgroundColor};
    top: 50%;
    transform: ${(props) => props.transformAfter};
  }

  &:before {
    ${(props) => props.active && jellyAnimation};
  }
`;

export const SquareInput = styled.input`
  background-color: transparent;
  box-sizing: border-box;
  color: ${(props) => props.theme.fontColor};
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  font-size: 1.4rem;
  font-weight: 500;
  height: 3.6rem;
  line-height: 1.43;
  letter-spacing: 0.1rem;
  outline: none;
  padding: 0.8rem 1.2rem;
  text-align: center;
  width: 5.2rem;
`;
