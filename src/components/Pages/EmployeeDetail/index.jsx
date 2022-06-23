import { useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { CgTrash } from 'react-icons/cg';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createNewAdvance,
  deleteAdvanceById,
  fetchAdvanceByEmployeeId,
} from '../../../api/advanceApi';
import { deleteEmployee } from '../../../api/employeeApi';
import {
  createNewWorking,
  deleteWorkingById,
  fetchWorkingByEmployeeId,
} from '../../../api/workingApi';
import { IconButton, OriginTextButton } from '../../../common/Button';
import {
  useDeleteEmployeeDetail,
  useGetEmployeeById,
  useUpdateEmployeeById,
} from '../../hooks/employeeDetail';
import { useGetTeamList } from '../../hooks/team';
import InformationContent from '../../InformationContent';
import LoadingSpinner from '../../LoadingSpinner';
import EmployeeDetailModals from '../../ModalGroup/EmployeeDetailModals';
import NavTab from '../../NavTab';
import StatisticsContent from '../../StatisticsContent';
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
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const {
    data: employee,
    isLoading: isEmployeeLoading,
    error,
  } = useGetEmployeeById(employeeId, page);
  const { data: teamList, isLoading: isTeamListLoading } = useGetTeamList();

  // functions
  const { mutate: updateEmployeeMutate } = useUpdateEmployeeById(page);

  const { mutate: deleteEmployeeMutate } =
    useDeleteEmployeeDetail(deleteEmployee);

  const handleEditEmployee = (values) => {
    setIsShowEditModal(false);
    updateEmployeeMutate(values);
  };

  const handleDeleteEmployee = (idx) => {
    deleteEmployeeMutate(idx);
    navigate('/');
  };

  if (isEmployeeLoading || isTeamListLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Container>
      <EmployeeDetailModals
        employee={employee}
        teamList={teamList}
        isShowDeleteModal={isShowDeleteModal}
        isShowEditModal={isShowEditModal}
        setIsShowEditModal={setIsShowEditModal}
        setIsShowDeleteModal={setIsShowDeleteModal}
        handleEditEmployee={handleEditEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
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
            <img src={employee.avatar} alt="" />
          </Avatar>
          <ButtonGroup>
            {/* <OriginTextButton active>No : {employee.id}</OriginTextButton> */}
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
            <TabContentItem active={activeTab === 3}>
              <StatisticsContent
                employeeId={employee.id}
                salaryPerHour={employee.moneyPerHour}
              />
            </TabContentItem>
          </TabContentContainer>
        </RightSide>
      </SideNavTab>
    </Container>
  );
};

export default EmployeeDetail;
