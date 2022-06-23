import styled from 'styled-components';
import { ContentItem } from '../InformationContent/InformationContentStyles';

export const SalaryTotal = styled(ContentItem)`
  color: ${(props) => props.theme.buttonBackgroundColor};
  text-align: center;
  width: 100%;
`;
