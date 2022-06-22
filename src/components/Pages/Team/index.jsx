import { useEffect, useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { IconButton } from '../../../common/Button';
import { Table, TRow, TRowItem } from '../../../common/Table';
import { TextCursorActive, TextLink } from '../../../common/Text';
import { useGetEmployeeListByTeamName } from '../../hooks/employee';
import { useCreateNewTeam, useGetTeamList } from '../../hooks/team';
import LoadingSpinner from '../../LoadingSpinner';
import TeamModals from '../../ModalGroup/TeamModals';
import NoneSpinner from '../../NoneSpinner';
import {
  Container,
  EmployeeControl,
  EmployeeControlItem,
  SideTitle,
} from '../Home/EmployeeListStyles';
import { EmployeeTable, SideTeam, TableCaption, TeamTable } from './TeamStyles';

const Team = () => {
  // state
  const [teamName, setTeamName] = useState('');
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  const {
    data: teamList,
    isLoading: isTeamListLoading,
    error: teamListError,
  } = useGetTeamList();

  const {
    data: employeeList,
    isLoading: isEmployeeListLoading,
    isIdle: isEmployeeListIdle,
  } = useGetEmployeeListByTeamName(teamName);

  // functions
  const { mutate: createNewTeamMutate } = useCreateNewTeam();

  const handleAddNewTeam = (values) => {
    const newTeam = {
      id: teamList.length + 1 + '',
      ...values,
    };

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
      <TeamModals
        isShowAddModal={isShowAddModal}
        setIsShowAddModal={setIsShowAddModal}
        handleAddNewTeam={handleAddNewTeam}
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
          <TableCaption>
            Total {teamList.length} {teamList.length > 1 ? 'teams' : 'team'}
          </TableCaption>
          <Table type="secondary" widthCols={[20, 50, 30]}>
            <TRow isRowTitle>
              <TRowItem>No</TRowItem>
              <TRowItem>Team Name</TRowItem>
              <TRowItem>Detail</TRowItem>
            </TRow>
            {teamList.map((item, idx) => (
              <TRow key={item.id}>
                <TRowItem data-label="No">
                  <TextCursorActive active={item.teamName === teamName}>
                    {idx + 1}
                  </TextCursorActive>
                </TRowItem>
                <TRowItem data-label="Team Name">
                  <TextCursorActive
                    active={item.teamName === teamName}
                    onClick={() => setTeamName(item.teamName)}
                  >
                    {item.teamName}
                  </TextCursorActive>
                </TRowItem>
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

        <EmployeeTable pt={employeeList.length === 0 ? '4' : '0'}>
          {employeeList.length === 0 ? (
            <NoneSpinner text={`Don't have ${teamName}' employees`} />
          ) : (
            <>
              <TableCaption>
                Total {employeeList.length}{' '}
                {employeeList.length > 1 ? 'employees' : 'employee'}
              </TableCaption>
              <Table type="secondary" widthCols={[10, 35, 20, 20, 15]}>
                <TRow isRowTitle>
                  <TRowItem>No</TRowItem>
                  <TRowItem>FullName</TRowItem>
                  <TRowItem>Phone</TRowItem>
                  <TRowItem>Address</TRowItem>
                  <TRowItem>Sex</TRowItem>
                </TRow>
                {employeeList.map((item, idx) => (
                  <TRow key={item.id}>
                    <TRowItem data-label="No">{idx + 1}</TRowItem>
                    <TRowItem data-label="FullName">
                      <TextLink to={`/employee/1/${item.id}`}>
                        {item.fullName}
                      </TextLink>
                    </TRowItem>
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
