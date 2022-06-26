import { useEffect, useState } from 'react';
import { CgTrash } from 'react-icons/cg';
import { RiAddLine } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';
import { useSnapshot } from 'valtio';
import {
  deleteEmployee,
  deleteEmployeeBySelected,
} from '../../../api/employeeApi';
import { chooseTeamName, setSortBy, setColumns } from '../../../app/actions';
import { store } from '../../../app/store';
import { IconButton, IconLinkButton } from '../../../common/Button';
import { CheckBox } from '../../../common/Input';
import { SortIcons, Table, TRow, TRowItem } from '../../../common/Table';
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
  TitleTable,
} from './EmployeeListStyles';
import EmployeeModals from '../../ModalGroup/EmployeeModals';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import SelectMultiple from '../../SelectMultiple';

const Home = () => {
  // states
  const { searchContent, employeePerPage, sortBy, columns } =
    useSnapshot(store);
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
    refetch,
  } = useGetEmployeeListBySearchContent({
    page,
    searchContent,
    pageLimit: employeePerPage,
    sortCondition: columns.find((col) => col.name === sortBy),
  });

  // functions
  const { mutate: addNewEmployeeMutate } = useCreateNewEmployee();

  const { mutate: deleteEmployeeMutate } = useDeleteEmployeeBySelected({
    deleteFn: deleteEmployee,
  });

  const { mutate: deleteEmployeeBySelectedMutate } =
    useDeleteEmployeeBySelected({
      deleteFn: deleteEmployeeBySelected,
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
    refetch();
  };

  const handleShowDeleteEmployeeModal = (idx) => {
    setDeleteIdx(idx);
    setIsShowDeleteModal(true);
  };

  const handleSortEmployeeListByColumn = (colName) => {
    if (sortBy === colName) {
      setColumns(colName);
    }
    setSortBy(colName);
  };

  const getSelected = (colName) => {
    const colList = columns.map((col) => col.name);
    return colList.includes(colName);
  };

  const convertProxyToArray = () => {
    let newCols = columns.map((col) => ({ ...col }));
    const colFullName = newCols.find((col) => col.name === 'fullName');
    newCols = newCols.filter((col) => col.name !== 'fullName');

    return [
      colFullName,
      ...newCols.sort((a, b) =>
        a.name > b.name ? 1 : a.name < b.name ? -1 : 0,
      ),
    ];
  };

  const getColumnsTable = () => {
    const restValueColumns = columns.map((_) => {
      return 60 / (columns.length - 1);
    });

    return [5, 20, ...restValueColumns.slice(1), 15];
  };

  useEffect(() => {
    if (employeeList?.data) {
      setCheckedList(
        createCheckedList(employeeList?.data.filter((item) => !item.deleted)),
      );
    }

    if (employeeList?.data.length === 0 && !isEmployeeListLoading) {
      setPage((prev) => Math.max(prev - 1, 1));
    }
  }, [employeeList?.data]);

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
          totalSelected={checkedList.reduce(
            (t, c) => (c.status && c.id !== '0' ? t + 1 : t),
            0,
          )}
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
        <SearchBar placeholder="Search employee by name..." />
      </SideSearch>
      <SideEmployeeList>
        <TitleTable>
          <h4>Search Result</h4>
          <SelectMultiple />
        </TitleTable>
        {employeeList.data.filter((item) => !item.deleted).length === 0 ? (
          <NoneSpinner text="Don't have any employee" />
        ) : (
          <Table type="secondary" widthCols={getColumnsTable()}>
            <TRow isRowTitle>
              <TRowItem>
                <CheckBox
                  active={checkedList[0].status}
                  onClick={() => handleChecked('0')}
                />
              </TRowItem>

              {convertProxyToArray().map((col) => (
                <TRowItem key={col.name + col.status}>
                  {col.name === 'moneyPerHour' ? 'money/h' : col.name}
                  <SortIcons
                    active={sortBy === col.name}
                    order={col.status}
                    onClick={() => handleSortEmployeeListByColumn(col.name)}
                  >
                    <TiArrowSortedUp />
                    <TiArrowSortedDown />
                  </SortIcons>
                </TRowItem>
              ))}
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
                {getSelected('fullName') && (
                  <TRowItem data-label="FullName">
                    <TextLink to={`/employee/${page}/${employee.id}`}>
                      {employee.fullName}
                    </TextLink>
                  </TRowItem>
                )}
                {getSelected('address') && (
                  <TRowItem data-label="Address">{employee.address}</TRowItem>
                )}

                {getSelected('age') && (
                  <TRowItem data-label="Age">{employee.age}</TRowItem>
                )}
                {getSelected('moneyPerHour') && (
                  <TRowItem data-label="moneyPerHour">
                    {employee.moneyPerHour}
                  </TRowItem>
                )}
                {getSelected('phoneNumber') && (
                  <TRowItem data-label="phoneNumber">
                    {employee.phoneNumber}
                  </TRowItem>
                )}
                {getSelected('sex') && (
                  <TRowItem data-label="Sex">{employee.sex}</TRowItem>
                )}
                {getSelected('startDay') && (
                  <TRowItem data-label="startDay">{employee.startDay}</TRowItem>
                )}

                {getSelected('team') && (
                  <TRowItem data-label="Team">
                    <TextLink
                      to={`/team`}
                      onClick={() => chooseTeamName(employee.team)}
                    >
                      {employee.team}
                    </TextLink>
                  </TRowItem>
                )}

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
        maxEmployeePerPage={employeeList?.total}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default Home;
