import { Container, Content, ContentItem } from './InformationContentStyles';

const InformationContent = ({ employee }) => {
  return (
    <Container>
      <h3>Information</h3>

      <Content>
        <ContentItem>Start Date : {employee.startDay}</ContentItem>
        <ContentItem>Team : {employee.team}</ContentItem>
        <ContentItem>Address : {employee.address}</ContentItem>
        <ContentItem>Salary per hours : {employee.moneyPerHour}</ContentItem>
        <ContentItem>Phone Number : {employee.phoneNumber}</ContentItem>
      </Content>
    </Container>
  );
};

export default InformationContent;
