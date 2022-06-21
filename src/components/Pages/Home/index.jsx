import { useEffect, useRef, useState } from 'react';
import { CgTrash } from 'react-icons/cg';
import { RiAddLine } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IconButton, IconLinkButton } from '../../../common/Button';
import { CheckBox } from '../../../common/Input';
import { Table, TRow, TRowItem } from '../../../common/Table';
import {
  createNewEmployee,
  deleteEmployee,
  fetchEmployeeData,
} from '../../../utils/employeeApi';
import { fetchTeamData } from '../../../utils/teamApi';
import AddEmployeeForm from '../../AddEmployeeForm';
import AddModal from '../../AddModal';
import AlertDeleteModal from '../../AlertDeleteModal';
import LoadingSpinner from '../../LoadingSpinner';
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

const createCheckedList = (employeeData) => {
  const list = [
    {
      id: '0',
      status: false,
    },
  ];

  for (let i = 0; i < employeeData.length; i++) {
    if (!employeeData[i].deleted) {
      list.push({
        id: employeeData[i].id || '0',
        status: false,
      });
    }
  }

  return list;
};

const findCheckListElementById = (checkedList, id) => {
  return checkedList.find((element) => element.id === id) || { status: false };
};

const handleSelectButton = (checkedList, idx) => {
  let newCheckedList;

  if (idx === '0') {
    const checkAllStatus = !checkedList[0].status;
    newCheckedList = checkedList.map((item) => ({
      ...item,
      status: checkAllStatus,
    }));
  } else {
    newCheckedList = checkedList.map((item) => {
      if (item.id === idx) {
        return {
          ...item,
          status: !item.status,
        };
      } else {
        return item;
      }
    });

    if (findCheckListElementById(checkedList, idx).status) {
      newCheckedList[0].status = false;
    } else {
      const checkAllStatus = newCheckedList
        .slice(1)
        .every((item) => item.status);
      newCheckedList[0].status = checkAllStatus;
    }
  }

  return newCheckedList;
};

const Home = () => {
  const queryClient = useQueryClient();

  // states
  const [page, setPage] = useState(1);
  const {
    data: employeeList,
    isLoading: isEmployeeListLoading,
    error,
    isPreviousData: isPreviousEmployeeList,
  } = useQuery(
    ['getEmployeeData', page + ''],
    () =>
      fetchEmployeeData({
        pageParam: page,
        limit: PAGE_LIMIT,
      }),
    {
      keepPreviousData: true,
    }
  );

  const { data: teamList, isLoading: isTeamListLoading } = useQuery(
    'getTeamData',
    fetchTeamData
  );
  const [checkedList, setCheckedList] = useState();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowDeleteAllModal, setIsShowDeleteAllModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(0);
  const formikRef = useRef();

  // functions
  const { mutate: addNewEmployeeMutate } = useMutation(createNewEmployee, {
    onSuccess(newEmployee) {
      // update check list
      setCheckedList(createCheckedList([...employeeList, newEmployee]));
      // update data
      queryClient.setQueryData('getEmployeeData', [
        ...employeeList,
        newEmployee,
      ]);
    },
  });

  const { mutate: deleteEmployeeMutate } = useMutation(deleteEmployee, {
    onSuccess(deletedEmployee) {
      // update data
      queryClient.setQueryData('getEmployeeData', (prev) =>
        prev.filter((item) => item.id !== deletedEmployee.id)
      );
    },
  });

  const handleChecked = (idx) => {
    const newCheckedList = handleSelectButton(checkedList, idx);
    setCheckedList(newCheckedList);
  };

  const handleDeleteAllSelected = (idx) => {
    if (idx) {
      deleteEmployeeMutate(idx);
    } else {
      console.log('deleted all');
    }
    setDeleteIdx(0);
  };

  const handleAddNewEmployee = (values) => {
    const newEmployee = {
      id: employeeList.data + 1 + '',
      deleted: false,
      team: 'manager',
      ...values,
    };
    setIsShowAddModal(false);
    addNewEmployeeMutate(newEmployee);
  };

  const handleShowDeleteEmployeeModal = (idx) => {
    setDeleteIdx(idx);
    setIsShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setIsShowAddModal(false);
    formikRef.current.resetFormik();
  };

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
        {/* Modal */}

        <AddModal
          Form={
            <AddEmployeeForm
              ref={formikRef}
              teams={teamList}
              handleShowModal={setIsShowAddModal}
              handleAddNewEmployee={handleAddNewEmployee}
            />
          }
          title="Add new Employee"
          isShowModal={isShowAddModal}
          handleCloseModal={handleCloseModal}
        />

        <AlertDeleteModal
          title="Are you sure to delete all employee selected?"
          message="Will delete all data employee selected!"
          isShowModal={isShowDeleteAllModal}
          handleShowModal={setIsShowDeleteAllModal}
          handleDeleteAllSelected={handleDeleteAllSelected}
        />

        <AlertDeleteModal
          deleteIdx={deleteIdx}
          title="Are you sure to delete this employee?"
          message="Will delete this employee!"
          isShowModal={isShowDeleteModal}
          handleShowModal={setIsShowDeleteModal}
          handleDeleteAllSelected={handleDeleteAllSelected}
        />
        {/* Modal */}

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
          <h3>Total: {employeeList.length}</h3>
        </EmployeeTotal>
        <SearchBar placeholder="Search employee by name..." />
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
                <TRowItem data-label="No">{employee.id}</TRowItem>
                <TRowItem data-label="FullName">{employee.fullName}</TRowItem>
                <TRowItem data-label="Phone">{employee.phoneNumber}</TRowItem>
                <TRowItem data-label="Team">{employee.team}</TRowItem>
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
