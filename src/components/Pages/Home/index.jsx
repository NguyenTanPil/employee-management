import debounce from 'lodash.debounce';
import { useEffect, useMemo, useState } from 'react';
import { CgTrash } from 'react-icons/cg';
import { RiAddLine } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { useMutation } from 'react-query';
import { createNewEmployee } from '../../../api/employeeApi';
import { IconButton, IconLinkButton } from '../../../common/Button';
import { CheckBox } from '../../../common/Input';
import { Table, TRow, TRowItem } from '../../../common/Table';
import { TextLink } from '../../../common/Text';
import {
  createCheckedList,
  findCheckListElementById,
  handleSelectButton,
} from '../../../utils/employee';
import {
  useDeleteEmployeeById,
  useDeleteEmployeeBySelected,
  useGetEmployeeListBySearchContent,
} from '../../hooks/employee';
import { useGetTeamList } from '../../hooks/team';
import LoadingSpinner from '../../LoadingSpinner';
import EmployeeModals from '../../ModalGroup/EmployeeModals';
import NoneSpinner from '../../NoneSpinner';
import Pagination from '../../Pagination';
import SearchBar from '../../SearchBar';
import {
  Container,
  EmployeeControl,
  EmployeeControlItem,
  EmployeeTotal,
  Options,
  SideEmployeeList,
  SideSearch,
  SideTitle,
} from './EmployeeListStyles';

const PAGE_LIMIT = 3;

const Home = () => {
  // states
  const [page, setPage] = useState(1);
  const [searchContent, setSearchContent] = useState('');
  const [checkedList, setCheckedList] = useState();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowDeleteAllModal, setIsShowDeleteAllModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(0);

  const {
    data: employeeList,
    isLoading: isEmployeeListLoading,
    error,
    isPreviousData: isPreviousEmployeeList,
  } = useGetEmployeeListBySearchContent({ page, searchContent, PAGE_LIMIT });
  const { data: teamList, isLoading: isTeamListLoading } = useGetTeamList();

  // functions
  const { mutate: addNewEmployeeMutate } = useMutation(createNewEmployee);

  const { mutate: deleteEmployeeMutate } = useDeleteEmployeeById(
    page,
    searchContent
  );

  const { mutate: deleteEmployeeBySelectedMutate } =
    useDeleteEmployeeBySelected(page, searchContent);

  const handleChecked = (idx) => {
    const newCheckedList = handleSelectButton(checkedList, idx);
    setCheckedList(newCheckedList);
  };

  const handleDeleteAllSelected = (idx) => {
    if (idx) {
      deleteEmployeeMutate(idx);
    } else {
      const employeeIdList = checkedList
        .filter((item) => item.id && item.status)
        .map((item) => item.id);
      deleteEmployeeBySelectedMutate(employeeIdList);
    }
    setDeleteIdx(0);
  };

  const handleAddNewEmployee = (values) => {
    const newEmployee = {
      id: parseInt(employeeList.total) + 1 + '',
      deleted: false,
      ...values,
    };
    setIsShowAddModal(false);
    addNewEmployeeMutate(newEmployee);
  };

  const handleShowDeleteEmployeeModal = (idx) => {
    setDeleteIdx(idx);
    setIsShowDeleteModal(true);
  };

  const handleChangeSearchInput = (e) => {
    setSearchContent(e.target.value);
  };

  const handleChangeSearchContent = useMemo(
    () => debounce(handleChangeSearchInput, 300),
    []
  );

  useEffect(() => {
    if (employeeList) {
      setCheckedList(
        createCheckedList(employeeList?.data.filter((item) => !item.deleted))
      );
    }
  }, [employeeList]);

  if (isEmployeeListLoading || !checkedList || isTeamListLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container>
      <SideTitle>
        <EmployeeModals
          deleteIdx={deleteIdx}
          teamList={teamList}
          isShowAddModal={isShowAddModal}
          isShowDeleteAllModal={isShowDeleteAllModal}
          isShowDeleteModal={isShowDeleteModal}
          setIsShowAddModal={setIsShowAddModal}
          handleAddNewEmployee={handleAddNewEmployee}
          setIsShowDeleteAllModal={setIsShowDeleteAllModal}
          handleDeleteAllSelected={handleDeleteAllSelected}
          setIsShowDeleteModal={setIsShowDeleteModal}
        />

        <h3>Employee</h3>
        <EmployeeControl>
          <EmployeeControlItem>
            <IconButton active onClick={() => setIsShowAddModal(true)}>
              <RiAddLine />
            </IconButton>
          </EmployeeControlItem>
          <EmployeeControlItem>
            <IconButton
              active
              danger
              disabled={checkedList.every((item) => !item.status)}
              onClick={() => setIsShowDeleteAllModal(true)}
            >
              <CgTrash />
            </IconButton>
          </EmployeeControlItem>
        </EmployeeControl>
      </SideTitle>
      <SideSearch>
        <EmployeeTotal>
          <h3>Total: {employeeList.total}</h3>
        </EmployeeTotal>
        <SearchBar
          placeholder="Search employee by name..."
          handleChange={handleChangeSearchContent}
        />
      </SideSearch>
      <SideEmployeeList>
        <h4>Search Result</h4>
        {employeeList.data.filter((item) => !item.deleted).length === 0 ? (
          <NoneSpinner text="Don't have any employee" />
        ) : (
          <Table type="secondary" widthCols={[10, 10, 25, 15, 20, 20]}>
            <TRow isRowTitle>
              <TRowItem>
                <CheckBox
                  active={checkedList[0].status}
                  onClick={() => handleChecked('0')}
                />
              </TRowItem>
              <TRowItem>No</TRowItem>
              <TRowItem>FullName</TRowItem>
              <TRowItem>Phone</TRowItem>
              <TRowItem>Team</TRowItem>
              <TRowItem>Options</TRowItem>
            </TRow>

            {employeeList.data.map((employee, idx) => (
              <TRow key={employee.id}>
                <TRowItem>
                  <CheckBox
                    active={
                      findCheckListElementById(checkedList, employee.id).status
                    }
                    onClick={() => handleChecked(employee.id)}
                  />
                </TRowItem>
                <TRowItem data-label="No">{idx + 1}</TRowItem>
                <TRowItem data-label="FullName">
                  <TextLink to={`/employee/${page}/${employee.id}`}>
                    {employee.fullName}
                  </TextLink>
                </TRowItem>
                <TRowItem data-label="Phone">{employee.phoneNumber}</TRowItem>
                <TRowItem data-label="Team">
                  <TextLink to={`/team/${employee.team}`}>
                    {employee.team}
                  </TextLink>
                </TRowItem>
                <TRowItem data-label="Options">
                  <Options>
                    <IconLinkButton to={`/employee/${page}/${employee.id}`}>
                      <TbListDetails />
                    </IconLinkButton>
                    <IconButton
                      danger
                      onClick={() => handleShowDeleteEmployeeModal(employee.id)}
                    >
                      <CgTrash />
                    </IconButton>
                  </Options>
                </TRowItem>
              </TRow>
            ))}
          </Table>
        )}
      </SideEmployeeList>

      <Pagination
        pageNumber={Math.ceil(employeeList.total / PAGE_LIMIT)}
        page={page}
        isPreviousData={isPreviousEmployeeList}
        setPage={setPage}
      />
    </Container>
  );
};

export default Home;
