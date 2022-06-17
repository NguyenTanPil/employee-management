import styled from 'styled-components';

export const Container = styled.div`
  width: 100%:
`;

export const SideTitle = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.6rem;
  padding-top: 1.6rem;

  & > h3 {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

export const EmployeeControl = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.6rem;
`;

export const EmployeeControlItem = styled.div`
  margin-left: 1.2rem;
`;

export const SideSearch = styled.div`
  position: relative;
`;

export const EmployeeTotal = styled.div`
  padding-bottom: 1.6rem;
  padding-top: 1.6rem;

  h3 {
    color: ${(props) => props.theme.titleColor};
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

export const SideEmployeeList = styled.div`
  h4 {
    color: ${(props) => props.theme.titleColor};
    font-size: 1.5rem;
    font-weight: 600;
  }

  & > div > div:first-child > div:first-child {
    border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};
    display: flex;

    @media only screen and (min-width: 576px) {
      border-bottom: 0;
    }
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    font-size: 1.8rem;
    padding-bottom: 0;
    padding-top: 0;
  }
`;
