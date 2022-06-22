import styled from 'styled-components';

export const SideTeam = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 2.4rem;
`;

export const TeamTable = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.4rem;
  width: 100%;

  @media only screen and (min-width: 768px) {
    margin-bottom: 0;
    width: 28%;
  }
`;

export const EmployeeTable = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => props.pt + 'rem'};
  width: 100%;

  @media only screen and (min-width: 768px) {
    width: 68%;
  }
`;

export const TableCaption = styled.h3`
  color: ${(props) => props.theme.fontColor};
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 0.8rem;
  margin-top: 1.2rem;

  span {
    color: ${(props) => props.theme.buttonBackgroundColor};
    text-transform: capitalize;
  }
`;
