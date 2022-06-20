import { useRef, useState } from 'react';
import { CgTrash } from 'react-icons/cg';
import { BiEditAlt } from 'react-icons/bi';
import { IconButton, OriginTextButton } from '../../../common/Button';
import InformationContent from '../../InformationContent';
import NavTab from '../../NavTab';
import {
  Container,
  EmployeeControl,
  EmployeeControlItem,
  SideTitle,
} from '../Home/EmployeeListStyles';
import {
  Avatar,
  ButtonGroup,
  LeftSide,
  RightSide,
  SideNavTab,
  TabContentContainer,
  TabContentItem,
} from './EmployeeDetailStyles';
import AddModal from '../../AddModal';
import AlertDeleteModal from '../../AlertDeleteModal';
import WorkingContent from '../../WorkingContent';
import AddEmployeeForm from '../../AddEmployeeForm';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { fetchEmployeeById } from '../../../utils/fetching';
import LoadingSpinner from '../../LoadingSpinner';

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

const workingData = [
  {
    no: 1,
    date: '2022-06-14',
    hours: 8,
    deleted: false,
  },
];

const advanceData = [
  {
    no: 1,
    date: '2022-06-14',
    money: 8,
    deleted: false,
  },
];

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const queryClient = useQueryClient();
  const {
    data: employee,
    isLoading,
    error,
  } = useQuery(['getEmployee', employeeId], fetchEmployeeById, {
    enable: !!employeeId,
    initialData: () => {
      return queryClient
        .getQueryData('getEmployeeData')
        ?.find((e) => e.id === employeeId);
    },
  });
  // const [employee, setEmployee] = useState(employeeData[2]);
  const [activeTab, setActiveTab] = useState(0);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const formikRef = useRef();

  const handleEditEmployee = (values) => {
    setIsShowEditModal(false);
    // setEmployee(values);
  };

  const handleDeleteEmployee = (idx) => {
    const newData = employeeData.map((item) => ({
      ...item,
      deleted: item.no === idx ? true : item.deleted,
    }));
    console.log(newData);
    setIsShowDeleteModal(false);
  };

  const handleCloseModal = () => {
    setIsShowEditModal(false);
    formikRef.current.resetFormik();
  };

  return (
    <Container>
      <AddModal
        title="update employee"
        Form={
          <AddEmployeeForm
            ref={formikRef}
            initialValues={employee}
            handleShowModal={setIsShowEditModal}
            handleAddNewEmployee={handleEditEmployee}
          />
        }
        isShowModal={isShowEditModal}
        handleCloseModal={handleCloseModal}
      />

      <AlertDeleteModal
        deleteIdx={employee.id}
        title="Are you sure to delete this employee?"
        message="Will delete this employee!"
        isShowModal={isShowDeleteModal}
        handleShowModal={setIsShowDeleteModal}
        handleDeleteAllSelected={handleDeleteEmployee}
      />
      <SideTitle>
        <h3>{employee.fullName}</h3>

        <EmployeeControl>
          <EmployeeControlItem>
            <IconButton active onClick={() => setIsShowEditModal(true)}>
              <BiEditAlt />
            </IconButton>
          </EmployeeControlItem>
          <EmployeeControlItem>
            <IconButton
              active
              danger
              onClick={() => setIsShowDeleteModal(true)}
            >
              <CgTrash />
            </IconButton>
          </EmployeeControlItem>
        </EmployeeControl>
      </SideTitle>
      <SideNavTab>
        <LeftSide>
          <Avatar>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkspTGDaYI0SloxfqGWTJMZYniyE8q9oqahw&usqp=CAU"
              alt=""
            />
          </Avatar>
          <ButtonGroup>
            <OriginTextButton active>No : {employee.id}</OriginTextButton>
            <OriginTextButton active success>
              Age : {employee.age}
            </OriginTextButton>
            <OriginTextButton active warning>
              Sex : {employee.sex}
            </OriginTextButton>
          </ButtonGroup>
        </LeftSide>
        <RightSide>
          <NavTab
            tabsNames={['information', 'working', 'advances', 'statistics']}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabContentContainer>
            <TabContentItem active={activeTab === 0}>
              <InformationContent employee={employee} />
            </TabContentItem>
            <TabContentItem active={activeTab === 1}>
              <WorkingContent
                title="Working"
                name="working"
                data={workingData}
                anotherField="hours"
              />
            </TabContentItem>
            <TabContentItem active={activeTab === 2}>
              <WorkingContent
                title="Advances"
                name="advance"
                data={advanceData}
                anotherField="money"
              />
            </TabContentItem>
          </TabContentContainer>
        </RightSide>
      </SideNavTab>
    </Container>
  );
};

export default EmployeeDetail;
