import { useRef, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { IconButton } from '../../../common/Button';
import { Table, TRow, TRowItem } from '../../../common/Table';
import AddModal from '../../AddModal';
import AddTeamForm from '../../AddTeamForm';
import NoneSpinner from '../../NoneSpinner';
import {
  Container,
  EmployeeControl,
  EmployeeControlItem,
  SideTitle,
} from '../Home/EmployeeListStyles';
import { TableCaption, EmployeeTable, SideTeam, TeamTable } from './TeamStyles';

const teams = [
  {
    no: 1,
    teamName: 'manager',
  },
  {
    no: 2,
    teamName: 'IT Support',
  },
  {
    no: 3,
    teamName: 'QA',
  },
];

const employeeData = [
  {
    no: '1',
    fullName: 'Tran Thi Huong',
    phoneNumber: '123456789',
    team: 'manager',
    address: 'Ha Noi',
    age: 12,
    startDay: '2022-06-14',
    sex: 'male',
    deleted: false,
    moneyPerHour: 0,
  },
  {
    no: '2',
    fullName: 'Vo Chi Thanh',
    phoneNumber: '123456789',
    team: 'IT Support',
    address: 'Ha Noi',
    age: 12,
    startDay: '2022-06-14',
    sex: 'male',
    deleted: false,
    moneyPerHour: 0,
  },
  {
    no: '3',
    fullName: 'Tran Van Long',
    phoneNumber: '123456789',
    team: 'engineer',
    address: 'Ha Noi',
    age: 12,
    startDay: '2022-06-14',
    sex: 'male',
    deleted: false,
    moneyPerHour: 0,
  },
  {
    no: '4',
    fullName: 'Tran Thi Manh Huong',
    phoneNumber: '123456789',
    team: 'manager',
    address: 'Ha Noi',
    age: 12,
    startDay: '2022-06-14',
    sex: 'male',
    deleted: false,
    moneyPerHour: 0,
  },
  {
    no: '5',
    fullName: 'Vo Thi Mai Phong',
    phoneNumber: '123456789',
    team: 'IT Support',
    address: 'Ha Noi',
    age: 12,
    startDay: '2022-06-14',
    sex: 'male',
    deleted: false,
    moneyPerHour: 0,
  },
];

const Team = () => {
  const [data, setData] = useState(teams);
  const [teamName, setTeamName] = useState(teams[0].teamName);
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const formikRef = useRef();
  const [employeeList, setEmployeeList] = useState(() => {
    return employeeData.filter((employee) => employee.team === teamName);
  });

  const handleChooseTeam = (teamName) => {
    setEmployeeList(() => {
      return employeeData.filter((employee) => employee.team === teamName);
    });
    setTeamName(teamName);
  };

  const handleCloseModal = () => {
    setIsShowAddModal(false);
    formikRef.current.resetFormik();
  };

  const handleAddNewTeam = (values) => {
    let newData = [...data];
    newData.push({
      no: newData.length + 1,
      ...values,
    });
    handleCloseModal();
    setData(newData);
  };

  return (
    <Container>
      <AddModal
        title={`Add new Team`}
        Form={
          <AddTeamForm
            ref={formikRef}
            handleShowModal={setIsShowAddModal}
            handleAddNewEmployee={handleAddNewTeam}
          />
        }
        isShowModal={isShowAddModal}
        handleCloseModal={handleCloseModal}
      />

      <SideTitle>
        <h3>Team</h3>
        <EmployeeControl>
          <EmployeeControlItem>
            <IconButton active onClick={() => setIsShowAddModal(true)}>
              <RiAddLine />
            </IconButton>
          </EmployeeControlItem>
        </EmployeeControl>
      </SideTitle>
      <SideTeam>
        <TeamTable>
          <TableCaption>Total {teams.length} teams</TableCaption>
          <Table type="secondary" widthCols={[20, 50, 30]}>
            <TRow isRowTitle>
              <TRowItem>No</TRowItem>
              <TRowItem>Team Name</TRowItem>
              <TRowItem>Detail</TRowItem>
            </TRow>
            {data.map((item) => (
              <TRow key={item.no}>
                <TRowItem data-label="No">{item.no}</TRowItem>
                <TRowItem data-label="Team Name">{item.teamName}</TRowItem>
                <TRowItem data-label="Detail">
                  <IconButton
                    pt="0"
                    pb="0"
                    onClick={() => handleChooseTeam(item.teamName)}
                  >
                    <TbListDetails />
                  </IconButton>
                </TRowItem>
              </TRow>
            ))}
          </Table>
        </TeamTable>

        <EmployeeTable pt={employeeList.length === 0 ? '4rem' : '0'}>
          {employeeList.length === 0 ? (
            <NoneSpinner text={`Don't have ${teamName}' employees`} />
          ) : (
            <>
              <TableCaption>
                Result all employee team <span>{teamName}</span> - Total{' '}
                {employeeList.length} employees
              </TableCaption>
              <Table type="secondary" widthCols={[10, 35, 20, 20, 15]}>
                <TRow isRowTitle>
                  <TRowItem>No</TRowItem>
                  <TRowItem>FullName</TRowItem>
                  <TRowItem>Phone</TRowItem>
                  <TRowItem>Address</TRowItem>
                  <TRowItem>Sex</TRowItem>
                </TRow>
                {employeeList.map((item) => (
                  <TRow key={item.no}>
                    <TRowItem data-label="No">{item.no}</TRowItem>
                    <TRowItem data-label="FullName">{item.fullName}</TRowItem>
                    <TRowItem data-label="Phone">{item.phoneNumber}</TRowItem>
                    <TRowItem data-label="Address">{item.address}</TRowItem>
                    <TRowItem data-label="Sex">{item.sex}</TRowItem>
                  </TRow>
                ))}
              </Table>
            </>
          )}
        </EmployeeTable>
      </SideTeam>
    </Container>
  );
};

export default Team;
