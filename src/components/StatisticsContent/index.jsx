import { useGetWorkingData } from '../hooks/working';
import {
  Container,
  Content,
  ContentItem,
} from '../InformationContent/InformationContentStyles';
import { SalaryTotal } from './StatisticsContentStyles';
import { fetchWorkingByEmployeeId } from '../../api/workingApi';
import { fetchAdvanceByEmployeeId } from '../../api/advanceApi';

const StatisticsContent = ({ employeeId, salaryPerHour }) => {
  const { total: workingTotal } = useGetWorkingData({
    title: 'Working',
    employeeId,
    fetchWorkingByEmployeeId,
  });

  const { total: advancesTotal } = useGetWorkingData({
    title: 'Advances',
    employeeId,
    field: 'money',
    fetchAdvanceByEmployeeId,
  });

  return (
    <Container>
      <h3>Statistics</h3>
      <Content>
        <ContentItem>Salary per hours : {salaryPerHour}</ContentItem>
        <ContentItem>Hours: {workingTotal}</ContentItem>
        <ContentItem>Salary : {workingTotal * salaryPerHour}</ContentItem>
        <ContentItem>Advances : {advancesTotal}</ContentItem>
        <SalaryTotal>
          Total : {salaryPerHour} * {workingTotal} - {advancesTotal} ={' '}
          {workingTotal * salaryPerHour - advancesTotal} USA
        </SalaryTotal>
      </Content>
    </Container>
  );
};

export default StatisticsContent;
