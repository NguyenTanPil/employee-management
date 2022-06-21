import { useRef, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, OriginTextButton } from '../../../common/Button';
import {
  createNewAdvance,
  deleteAdvanceById,
  fetchAdvanceByEmployeeId,
} from '../../../utils/advanceApi';
import {
  deleteEmployee,
  fetchEmployeeById,
  updateEmployee,
} from '../../../utils/employeeApi';
import { fetchTeamData } from '../../../utils/teamApi';
import {
  createNewWorking,
  deleteWorkingById,
  fetchWorkingByEmployeeId,
} from '../../../utils/workingApi';
import AddEmployeeForm from '../../AddEmployeeForm';
import AddModal from '../../AddModal';
import AlertDeleteModal from '../../AlertDeleteModal';
import InformationContent from '../../InformationContent';
import LoadingSpinner from '../../LoadingSpinner';
import NavTab from '../../NavTab';
import WorkingContent from '../../WorkingContent';
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

const EmployeeDetail = () => {
  const { page, employeeId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: employee, isLoading: isEmployeeLoading } = useQuery(
    ['getEmployee', employeeId],
    fetchEmployeeById,
    {
      enable: !!employeeId && !!page,
      initialData: () => {
        return queryClient
          .getQueryData(['getEmployeeData', page])
          .data?.find((e) => e.id === employeeId);
      },
    }
  );
  const { data: teamList, isLoading: isTeamListLoading } = useQuery(
    'getTeamData',
    fetchTeamData
  );

  const [activeTab, setActiveTab] = useState(0);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const formikRef = useRef();

  // functions
  const { mutate: updateEmployeeMutate } = useMutation(updateEmployee, {
    onSuccess(newEmployee) {
      queryClient.setQueryData(['getEmployee', newEmployee.id], newEmployee);
    },
  });

  const { mutate: deleteEmployeeMutate } = useMutation(deleteEmployee, {
    onSuccess(deletedEmployee) {
      // update data
      queryClient.setQueryData('getEmployeeData', (prev) =>
        prev.filter((item) => item.id !== deletedEmployee.id)
      );

      // redirect to home
      navigate('/');
    },
  });

  const handleEditEmployee = (values) => {
    setIsShowEditModal(false);
    updateEmployeeMutate(values);
  };

  const handleDeleteEmployee = (idx) => {
    deleteEmployeeMutate(idx);
  };

  const handleCloseModal = () => {
    setIsShowEditModal(false);
    formikRef.current.resetFormik();
  };

  if (isEmployeeLoading || isTeamListLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      <AddModal
        title="update employee"
        Form={
          <AddEmployeeForm
            ref={formikRef}
            initialValues={employee}
            teams={teamList}
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
                anotherField="hours"
                employeeId={employee.id}
                fetchFn={fetchWorkingByEmployeeId}
                createFn={createNewWorking}
                deleteFn={deleteWorkingById}
              />
            </TabContentItem>
            <TabContentItem active={activeTab === 2}>
              <WorkingContent
                title="Advances"
                name="advances"
                anotherField="money"
                employeeId={employee.id}
                fetchFn={fetchAdvanceByEmployeeId}
                createFn={createNewAdvance}
                deleteFn={deleteAdvanceById}
              />
            </TabContentItem>
          </TabContentContainer>
        </RightSide>
      </SideNavTab>
    </Container>
  );
};

export default EmployeeDetail;
