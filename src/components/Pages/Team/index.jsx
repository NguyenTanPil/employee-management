import { useEffect, useState } from 'react';
import { CgTrash } from 'react-icons/cg';
import { RiAddLine } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';
import { useSnapshot } from 'valtio';
import { chooseTeamName } from '../../../app/actions';
import { store } from '../../../app/store';
import { IconButton } from '../../../common/Button';
import { Table, TRow, TRowItem } from '../../../common/Table';
import { TextCursorActive, TextLink } from '../../../common/Text';
import { useGetEmployeeListByTeamName } from '../../hooks/employee';
import {
  useCreateNewTeam,
  useDeleteEmployeeInTeam,
  useGetTeamList,
} from '../../hooks/team';
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
  const { teamName } = useSnapshot(store);
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(0);

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
  const { mutate: deleteEmployeeInTeamMutate } =
    useDeleteEmployeeInTeam(teamName);

  const handleAddNewTeam = (values) => {
    const newTeam = {
      id: uuidv4(),
      ...values,
    };

    createNewTeamMutate(newTeam);
  };

  const handleDeleteEmployeeInTeam = (idx) => {
    deleteEmployeeInTeamMutate(idx);
    setIsShowDeleteModal(false);
    setDeleteIdx(0);
  };

  const handleShowDeleteEmployeeModal = (idx) => {
    setDeleteIdx(idx);
    setIsShowDeleteModal(true);
  };

  useEffect(() => {
    if (teamList && !teamName) {
      chooseTeamName(teamList[0].teamName);
    }
  }, [teamList, teamName]);

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
        deleteIdx={deleteIdx}
        isShowDeleteModal={isShowDeleteModal}
        setIsShowDeleteModal={setIsShowDeleteModal}
        setIsShowAddModal={setIsShowAddModal}
        handleAddNewTeam={handleAddNewTeam}
        handleDeleteEmployee={handleDeleteEmployeeInTeam}
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
                    onClick={() => chooseTeamName(item.teamName)}
                  >
                    {item.teamName}
                  </TextCursorActive>
                </TRowItem>
                <TRowItem data-label="Detail">
                  <IconButton
                    pt="0"
                    pb="0"
                    onClick={() => chooseTeamName(item.teamName)}
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
              <Table type="secondary" widthCols={[7, 30, 19, 20, 12, 12]}>
                <TRow isRowTitle>
                  <TRowItem>No</TRowItem>
                  <TRowItem>FullName</TRowItem>
                  <TRowItem>Phone</TRowItem>
                  <TRowItem>Address</TRowItem>
                  <TRowItem>Sex</TRowItem>
                  <TRowItem>Option</TRowItem>
                </TRow>
                {employeeList.map((item, idx) => (
                  <TRow key={item.id}>
                    <TRowItem data-label="No">{idx + 1}</TRowItem>
                    <TRowItem data-label="FullName">
                      <TextLink to={`/employee/0/${item.id}`}>
                        {item.fullName}
                      </TextLink>
                    </TRowItem>
                    <TRowItem data-label="Phone">{item.phoneNumber}</TRowItem>
                    <TRowItem data-label="Address">{item.address}</TRowItem>
                    <TRowItem data-label="Sex">{item.sex}</TRowItem>
                    <TRowItem data-label="Option">
                      <IconButton
                        danger
                        pt="0"
                        pb="0"
                        onClick={() => handleShowDeleteEmployeeModal(item.id)}
                      >
                        <CgTrash />
                      </IconButton>
                    </TRowItem>
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
