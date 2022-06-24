import { useEffect, useState } from 'react';
import { CgTrash } from 'react-icons/cg';
import { RiAddLine } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { useMutation } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import { useSnapshot } from 'valtio';
import {
  createNewEmployee,
  deleteEmployee,
  deleteEmployeeBySelected,
} from '../../../api/employeeApi';
import { chooseTeamName, onChangeEmployeePerPage } from '../../../app/actions';
import { store } from '../../../app/store';
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
  useCreateNewEmployee,
  useDeleteEmployeeBySelected,
  useGetEmployeeListBySearchContent,
} from '../../hooks/employee';
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

const Home = () => {
  // states
  const { searchContent, employeePerPage } = useSnapshot(store);
  const [page, setPage] = useState(1);
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
  } = useGetEmployeeListBySearchContent({
    page,
    searchContent,
    pageLimit: employeePerPage,
  });

  // functions
  const { mutate: addNewEmployeeMutate } = useCreateNewEmployee();

  const { mutate: deleteEmployeeMutate } = useDeleteEmployeeBySelected({
    deleteFn: deleteEmployee,
    page,
    searchContent,
  });

  const { mutate: deleteEmployeeBySelectedMutate } =
    useDeleteEmployeeBySelected({
      deleteFn: deleteEmployeeBySelected,
      page,
      searchContent,
    });

  const handleChecked = (idx) => {
    const newCheckedList = handleSelectButton(checkedList, idx);
    setCheckedList(newCheckedList);
  };

  const handleDeleteAllSelected = (idx) => {
    if (idx) {
      deleteEmployeeMutate(idx);
    } else {
      const employeeIdList = checkedList
        .filter((item) => item.id !== '0' && item.status)
        .map((item) => item.id);
      deleteEmployeeBySelectedMutate(employeeIdList);
    }
    setDeleteIdx(0);
  };

  const handleAddNewEmployee = (values) => {
    const newEmployee = {
      id: uuidv4(),
      deleted: false,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA2t-l5SHRlLzaSwUJO33flcmeZdFtiFJk8A&usqp=CAU',
      ...values,
    };
    setIsShowAddModal(false);
    addNewEmployeeMutate(newEmployee);
  };

  const handleShowDeleteEmployeeModal = (idx) => {
    setDeleteIdx(idx);
    setIsShowDeleteModal(true);
  };

  useEffect(() => {
    if (employeeList?.data) {
      setCheckedList(
        createCheckedList(employeeList?.data.filter((item) => !item.deleted))
      );
    }
  }, [employeeList?.data]);

  useEffect(() => {
    if (!employeeList?.data.length || !employeeList?.data) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  }, [employeePerPage, employeeList?.data]);

  // useEffect(() => {
  //   if (employeeList?.data.length) {
  //     onChangeEmployeePerPage(employeeList?.data.length);
  //   }
  // }, [searchContent, employeeList?.data]);

  if (isEmployeeListLoading || !checkedList) {
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
          employeeListLength={employeeList?.data.length}
          placeholder="Search employee by name..."
        />
      </SideSearch>
      <SideEmployeeList>
        <h4>Search Result</h4>
        {employeeList.data.filter((item) => !item.deleted).length === 0 ? (
          <NoneSpinner text="Don't have any employee" />
        ) : (
          <Table type="secondary" widthCols={[10, 35, 15, 20, 20]}>
            <TRow isRowTitle>
              <TRowItem>
                <CheckBox
                  active={checkedList[0].status}
                  onClick={() => handleChecked('0')}
                />
              </TRowItem>
              <TRowItem>FullName</TRowItem>
              <TRowItem>Phone</TRowItem>
              <TRowItem>Team</TRowItem>
              <TRowItem>Options</TRowItem>
            </TRow>

            {employeeList.data.map((employee) => (
              <TRow key={employee.id}>
                <TRowItem>
                  <CheckBox
                    active={
                      findCheckListElementById(checkedList, employee.id).status
                    }
                    onClick={() => handleChecked(employee.id)}
                  />
                </TRowItem>
                <TRowItem data-label="FullName">
                  <TextLink to={`/employee/${page}/${employee.id}`}>
                    {employee.fullName}
                  </TextLink>
                </TRowItem>
                <TRowItem data-label="Phone">{employee.phoneNumber}</TRowItem>
                <TRowItem data-label="Team">
                  <TextLink
                    to={`/team`}
                    onClick={() => chooseTeamName(employee.team)}
                  >
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
        pageNumber={Math.ceil(employeeList.total / employeePerPage)}
        maxEmployeePerPage={employeeList.total}
        page={page}
        employeePerPage={employeePerPage}
        isPreviousData={isPreviousEmployeeList}
        setPage={setPage}
      />
    </Container>
  );
};

export default Home;
