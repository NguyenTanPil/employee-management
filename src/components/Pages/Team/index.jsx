import { useEffect, useRef, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IconButton } from '../../../common/Button';
import { Table, TRow, TRowItem } from '../../../common/Table';
import { fetchEmployeeByTeamId } from '../../../utils/employeeApi';
import { createNewTeam, fetchTeamData } from '../../../utils/teamApi';
import AddModal from '../../AddModal';
import AddTeamForm from '../../AddTeamForm';
import LoadingSpinner from '../../LoadingSpinner';
import NoneSpinner from '../../NoneSpinner';
import {
  Container,
  EmployeeControl,
  EmployeeControlItem,
  SideTitle,
} from '../Home/EmployeeListStyles';
import { EmployeeTable, SideTeam, TableCaption, TeamTable } from './TeamStyles';

const Team = () => {
  const queryClient = useQueryClient();

  // state
  const {
    data: teamList,
    isLoading: isTeamListLoading,
    error: teamListError,
  } = useQuery('getTeamData', fetchTeamData);

  const [teamName, setTeamName] = useState();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const formikRef = useRef();

  const {
    data: employeeList,
    isLoading: isEmployeeListLoading,
    isIdle: isEmployeeListIdle,
  } = useQuery(['getEmployeeByFilter', teamName], fetchEmployeeByTeamId, {
    enabled: !!teamName,
  });

  // functions
  const { mutate: createNewTeamMutate } = useMutation(createNewTeam, {
    onSuccess(newTeam) {
      queryClient.setQueryData('getTeamData', [...teamList, newTeam]);
    },
  });

  const handleCloseModal = () => {
    setIsShowAddModal(false);
    formikRef.current.resetFormik();
  };

  const handleAddNewTeam = (values) => {
    const newTeam = {
      id: teamList.length + 1 + '',
      ...values,
    };
    handleCloseModal(false);
    createNewTeamMutate(newTeam);
  };

  useEffect(() => {
    if (teamList) {
      setTeamName(teamList[0].teamName);
    }
  }, [teamList]);

  if (isTeamListLoading || isEmployeeListLoading || isEmployeeListIdle) {
    return <LoadingSpinner />;
  }

  if (teamListError) {
    return <div>Error: {teamListError.message}</div>;
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
          <TableCaption>Total {teamList.length} teams</TableCaption>
          <Table type="secondary" widthCols={[20, 50, 30]}>
            <TRow isRowTitle>
              <TRowItem>No</TRowItem>
              <TRowItem>Team Name</TRowItem>
              <TRowItem>Detail</TRowItem>
            </TRow>
            {teamList.map((item, idx) => (
              <TRow key={item.id}>
                <TRowItem data-label="No">{idx + 1}</TRowItem>
                <TRowItem data-label="Team Name">{item.teamName}</TRowItem>
                <TRowItem data-label="Detail">
                  <IconButton
                    pt="0"
                    pb="0"
                    onClick={() => setTeamName(item.teamName)}
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
