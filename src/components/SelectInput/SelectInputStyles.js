import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 2.4rem;
  position: relative;
  width: 100%;
`;

export const SelectValue = styled.div`
  cursor: pointer;
  position: relative;
  width: 100%;

  span {
    background-color: transparent;
    border: 0;
    border-bottom: 0.2rem solid ${(props) => props.theme.borderColor};
    box-sizing: border-box;
    color: ${(props) => props.theme.fontColor};
    display: block;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
    padding: 1.3rem 1.6rem 0.8rem 0;
    position: relative;
    text-transform: capitalize;
    width: 100%;
    z-index: 2000;
  }

  svg {
    color: ${(props) => props.theme.fontColor};
    font-size: 2rem;
    position: absolute;
    right: 0.8rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const SelectOptions = styled.ul`
  background-color: ${(props) => props.theme.selectBackgroundColor};
  border-radius: 0.4rem;
  box-shadow: rgb(99 99 99 / 20%) 0 0.2rem 0.8rem 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 0.8rem);
  left: 0;
  width: 100%;
  z-index: 2022;
`;

export const SelectOptionItem = styled.li.attrs((props) => ({
  selectedBackgroundColor: props.selected
    ? props.theme.borderColor
    : props.theme.selectBackgroundColor,
  selectedColor: props.selected
    ? props.theme.buttonBackgroundColor
    : props.theme.fontColor,
  selectedPaddingLeft: props.selected ? '1.2rem' : '1.6rem',
}))`
  background-color: ${(props) => props.selectedBackgroundColor};
  color: ${(props) => props.selectedColor};
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  padding: 1.2rem 1.6rem 0.8rem 1.2rem;
  text-transform: capitalize;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.theme.buttonBackgroundColor};
    padding-left: ${(props) => props.selectedPaddingLeft};
  }

  &:first-child {
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
  }

  &:last-child {
    border-bottom-left-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
  }
`;
