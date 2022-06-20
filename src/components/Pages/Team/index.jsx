import { useRef, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { IconButton } from '../../../common/Button';
import { Table, TRow, TRowItem } from '../../../common/Table';
import {
  fetchEmployeeByTeamId,
  fetchEmployeeData,
  fetchTeamData,
} from '../../../utils/fetching';
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
import { useQuery, useQueryClient } from 'react-query';
import LoadingSpinner from '../../LoadingSpinner';
import { useEffect } from 'react';

const Team = () => {
  const queryClient = useQueryClient();
  const {
    data: teams,
    isLoading: isLoadingTeams,
    error,
  } = useQuery('teams', fetchTeamData);

  const [teamName, setTeamName] = useState();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const formikRef = useRef();

  const {
    data: employeeList,
    isLoading: isLoadingEmployees,
    isIdle: isIdleEmployees,
  } = useQuery(['getEmployeeByFilter', teamName], fetchEmployeeByTeamId, {
    enabled: !!teamName,
    initialData() {
      return queryClient
        .getQueryData('getEmployeeData')
        ?.filter((e) => e.team === teamName);
    },
  });

  const handleChooseTeam = (teamName) => {
    setTeamName(teamName);
  };

  const handleCloseModal = () => {
    setIsShowAddModal(false);
    formikRef.current.resetFormik();
  };

  const handleAddNewTeam = (values) => {
    let newData = [...teams];
    newData.push({
      id: newData.length + 1,
      ...values,
    });
    handleCloseModal();
    // setData(newData);
  };

  useEffect(() => {
    if (teams) {
      setTeamName(teams[0].teamName);
    }
  }, [teams]);

  if (isLoadingTeams || isLoadingEmployees || isIdleEmployees) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
            {teams.map((item) => (
              <TRow key={item.id}>
                <TRowItem data-label="No">{item.id}</TRowItem>
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
                  <TRow key={item.id}>
                    <TRowItem data-label="No">{item.id}</TRowItem>
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
