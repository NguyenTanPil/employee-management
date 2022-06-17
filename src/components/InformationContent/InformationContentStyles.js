import styled from 'styled-components';

export const Container = styled.div`
  box-sizing: border-box;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  width: 100%;

  h3 {
    color: ${(props) => props.theme.titleColor};
    font-size: 1.6rem;
    font-weight: 600;
    letter-spacing: 0.1rem;
    margin: 0;
    text-transform: uppercase;
  }
`;
export const Content = styled.ul`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

export const ContentItem = styled.li`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  box-sizing: border-box;
  color: ${(props) => props.theme.fontColor};
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 2rem;
  padding: 1.2rem 0.8rem;
  width: 100%;

  @media only screen and (min-width: 576px) {
    width: 46%;
  }
`;
