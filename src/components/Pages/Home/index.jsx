import { useRef, useState } from 'react';
import { TbListDetails } from 'react-icons/tb';
import { CgTrash } from 'react-icons/cg';
import { RiAddLine } from 'react-icons/ri';
import { IconButton, IconLinkButton } from '../../../common/Button';
import { CheckBox } from '../../../common/Input';
import { Table, TRow, TRowItem } from '../../../common/Table';
import AddEmployeeForm from '../../AddEmployeeForm';
import AddModal from '../../AddModal';
import AlertDeleteModal from '../../AlertDeleteModal';
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

const employeeData = [
  {
    no: '1',
    fullName: 'Tran Thi Huong',
    phoneNumber: '123456789',
    team: 'Manager',
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
    team: 'Engineer',
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
    team: 'Manager',
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
    team: 'Engineer',
    address: 'Ha Noi',
    age: 12,
    startDay: '2022-06-14',
    sex: 'male',
    deleted: false,
    moneyPerHour: 0,
  },
];

const createCheckedList = (employeeData) => {
  const list = [
    {
      id: 0,
      status: false,
    },
  ];
  for (let i = 0; i < employeeData.length; i++) {
    list.push({
      id: employeeData[i].id || 0,
      status: false,
    });
  }
  return list;
};

const Home = () => {
  const [checkedList, setCheckedList] = useState(
    createCheckedList(employeeData)
  );
  const [data, setData] = useState([...employeeData]);

  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowDeleteAllModal, setIsShowDeleteAllModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(0);
  const formikRef = useRef();

  const handleChecked = (idx) => {
    let newCheckedList;

    if (idx === 0) {
      const checkAllStatus = !checkedList[0].status;
      newCheckedList = checkedList.map((item) => ({
        ...item,
        status: checkAllStatus,
      }));
    } else {
      newCheckedList = [...checkedList];
      newCheckedList[idx].status = !newCheckedList[idx].status;

      if (checkedList[idx]) {
        newCheckedList[0].status = false;
      } else {
        const checkAllStatus = newCheckedList
          .slice(1)
          .every((item) => item.status);
        newCheckedList[0].status = checkAllStatus;
      }
    }

    setCheckedList(newCheckedList);
  };

  const handleDeleteAllSelected = (idx) => {
    const newData = data.map((item) => ({
      ...item,
      deleted:
        checkedList[item.no].status || item.no === idx ? true : item.deleted,
    }));
    setData(newData);
    setDeleteIdx(0);
    setCheckedList(createCheckedList(newData));
  };

  const handleAddNewEmployee = (values) => {
    let newData = [...data];
    newData.push({
      no: newData.length + 1,
      deleted: false,
      team: 'manager',
      ...values,
    });
    setIsShowAddModal(false);
    setData(newData);
    setCheckedList(createCheckedList(newData));
  };

  const handleShowDeleteEmployeeModal = (idx) => {
    setDeleteIdx(idx);
    setIsShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setIsShowAddModal(false);
    formikRef.current.resetFormik();
  };

  return (
    <Container>
      <SideTitle>
        {/* Modal */}

        <AddModal
          Form={
            <AddEmployeeForm
              ref={formikRef}
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
          <h3>Total: {data.length}</h3>
        </EmployeeTotal>
        <SearchBar placeholder="Search employee by name..." />
      </SideSearch>
      <SideEmployeeList>
        <h4>Search Result</h4>
        {data.filter((item) => !item.deleted).length === 0 ? (
          <NoneSpinner text="Don't have any employee" />
        ) : (
          <Table type="secondary" widthCols={[10, 10, 25, 15, 20, 20]}>
            <TRow isRowTitle>
              <TRowItem>
                <CheckBox
                  active={checkedList[0].status}
                  onClick={() => handleChecked(0)}
                />
              </TRowItem>
              <TRowItem>No</TRowItem>
              <TRowItem>FullName</TRowItem>
              <TRowItem>Phone</TRowItem>
              <TRowItem>Team</TRowItem>
              <TRowItem>Options</TRowItem>
            </TRow>
            {data.map((employee, idx) =>
              employee.deleted ? null : (
                <TRow key={employee.no}>
                  <TRowItem>
                    <CheckBox
                      active={checkedList[idx + 1].status}
                      onClick={() => handleChecked(idx + 1)}
                    />
                  </TRowItem>
                  <TRowItem data-label="No">{employee.no}</TRowItem>
                  <TRowItem data-label="FullName">{employee.fullName}</TRowItem>
                  <TRowItem data-label="Phone">{employee.phoneNumber}</TRowItem>
                  <TRowItem data-label="Team">{employee.team}</TRowItem>
                  <TRowItem data-label="Options">
                    <Options>
                      <IconLinkButton to={`/employee/${employee.no}`}>
                        <TbListDetails />
                      </IconLinkButton>
                      <IconButton
                        danger
                        onClick={() =>
                          handleShowDeleteEmployeeModal(employee.no)
                        }
                      >
                        <CgTrash />
                      </IconButton>
                    </Options>
                  </TRowItem>
                </TRow>
              )
            )}
          </Table>
        )}
      </SideEmployeeList>
      <Pagination pageNumber={2} />
    </Container>
  );
};

export default Home;
