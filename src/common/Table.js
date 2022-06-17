import styled, { css } from 'styled-components';

/*
  type:
    - primary: same width with column number
    - secondary: custom width
*/

const renderWidthTRowItem = (props) => {
  const { type, colNumber, widthCols: widthArr } = props;
  let style = '';

  if (type === 'primary') {
    style += `width: calc((100% - ((${colNumber} - 1) * 0.1rem)) / ${colNumber});`;
  } else {
    for (let i = 0; i < widthArr.length; i++) {
      style += `
        &:nth-child(${i + 1}) {
          width: ${widthArr[i]}%;
        }
      `;
    }
  }

  return css`
    ${style}
  `;
};

export const Table = styled.div`
  width: 100%;

  @media only screen and (min-width: 576px) {
    border: 0.1rem solid ${(props) => props.theme.borderColor};

    & > div > div {
      ${(props) => renderWidthTRowItem(props)}
    }
  }
`;

export const TRow = styled.div`
  border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1.6rem;

  &:first-child {
    border-bottom: 0;
  }

  & > div {
    color: ${(props) =>
      props.isRowTitle ? props.theme.titleColor : props.theme.fontColor};
    display: ${(props) => props.isRowTitle && 'none'};
    font-weight: ${(props) => (props.isRowTitle ? '600' : '400')};
  }

  @media only screen and (min-width: 576px) {
    flex-direction: row;
    margin-bottom: 0;

    & > div {
      display: flex;
    }

    &:last-child {
      border-bottom: none;
    }

    &:first-child {
      border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};
    }
  }
`;

export const TRowItem = styled.div`
  border-left: 0.1rem solid ${(props) => props.theme.borderColor};
  border-right: 0.1rem solid ${(props) => props.theme.borderColor};
  border-top: 0.1rem solid ${(props) => props.theme.borderColor};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 400;
  max-height: 4rem;
  text-align: center;
  text-transform: capitalize;
  padding: 0.8rem 1.6rem;
  width: 100%;

  &:before {
    content: attr(data-label);
    font-weight: 600;
  }

  &:first-child {
    border-top-width: 0.3rem;
  }

  @media only screen and (min-width: 576px) {
    border-left: 0;
    border-right: 0.1rem solid ${(props) => props.theme.borderColor};
    border-top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.2rem 0;

    &:before {
      content: '';
    }

    &:last-child {
      border-right: none;
    }
  }
`;
