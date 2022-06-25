import { useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { BsFillCameraFill } from 'react-icons/bs';
import { CgTrash } from 'react-icons/cg';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnapshot } from 'valtio';
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
import { store } from '../../../app/store';
import { IconButton, OriginTextButton } from '../../../common/Button';
import { useUpdateEmployeeAvatar } from '../../hooks/employee';
import {
  useDeleteEmployeeDetail,
  useGetEmployeeById,
  useUpdateEmployeeById,
} from '../../hooks/employeeDetail';
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
  OverlayAvatar,
  RightSide,
  SideNavTab,
  TabContentContainer,
  TabContentItem,
} from './EmployeeDetailStyles';

const EmployeeDetail = () => {
  const { page, employeeId } = useParams();
  const navigate = useNavigate();
  const { searchContent, employeePerPage, columns, sortBy } =
    useSnapshot(store);

  const [activeTab, setActiveTab] = useState(0);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowUpdateAvatarModal, setIsShowUpdateAvatarModal] = useState(false);

  const {
    data: employee,
    isLoading: isEmployeeLoading,
    error,
  } = useGetEmployeeById({
    employeeId,
    page,
    searchContent,
    pageLimit: employeePerPage,
    sortCondition: columns.find((col) => col.name === sortBy),
  });

  // functions
  const { mutate: updateEmployeeMutate } = useUpdateEmployeeById();

  const { mutate: updateEmployeeAvatarMutate } =
    useUpdateEmployeeAvatar(employeeId);

  const { mutate: deleteEmployeeMutate } =
    useDeleteEmployeeDetail(deleteEmployee);

  const handleEditEmployee = (values) => {
    setIsShowEditModal(false);
    updateEmployeeMutate(values);
  };

  const handleUpdateEmployeeAvatar = (values) => {
    setIsShowUpdateAvatarModal(false);
    updateEmployeeAvatarMutate({
      employeeId: employeeId,
      imgUrl: values.teamName,
    });
  };

  const handleDeleteEmployee = (idx) => {
    deleteEmployeeMutate(idx);
    navigate('/');
  };

  if (isEmployeeLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Container>
      <EmployeeDetailModals
        employee={employee}
        isShowDeleteModal={isShowDeleteModal}
        isShowEditModal={isShowEditModal}
        isShowUpdateAvatarModal={isShowUpdateAvatarModal}
        setIsShowUpdateAvatarModal={setIsShowUpdateAvatarModal}
        setIsShowEditModal={setIsShowEditModal}
        setIsShowDeleteModal={setIsShowDeleteModal}
        handleEditEmployee={handleEditEmployee}
        handleDeleteEmployee={handleDeleteEmployee}
        handleUpdateEmployeeAvatar={handleUpdateEmployeeAvatar}
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
            <OverlayAvatar>
              <IconButton onClick={() => setIsShowUpdateAvatarModal(true)}>
                <BsFillCameraFill />
              </IconButton>
            </OverlayAvatar>
          </Avatar>
          <ButtonGroup>
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
