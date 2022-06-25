import { useRef } from 'react';
import AddModal from '../AddModal';
import AddTeamForm from '../AddTeamForm';
import AlertDeleteModal from '../AlertDeleteModal';

export default function TeamModals({
  isShowAddModal,
  deleteIdx,
  deleteTeamIdx,
  isShowDeleteModal,
  isShowDeleteTeamModal,
  employeeListLength,
  setIsShowDeleteTeamModal,
  setIsShowDeleteModal,
  setIsShowAddModal,
  handleAddNewTeam,
  handleDeleteEmployee,
  handleDeleteTeam,
}) {
  const formikRef = useRef();

  const handleCloseModal = () => {
    setIsShowAddModal(false);
    formikRef.current.resetFormik();
  };

  return (
    <>
      <AddModal
        title={`Add new Team`}
        Form={
          <AddTeamForm
            ref={formikRef}
            placeholder="Team Name"
            handleShowModal={setIsShowAddModal}
            handleAddNewEmployee={handleAddNewTeam}
          />
        }
        isShowModal={isShowAddModal}
        handleCloseModal={handleCloseModal}
      />

      <AlertDeleteModal
        deleteIdx={deleteIdx}
        title={`Are you sure to delete employee?`}
        message={`Will delete this employee!`}
        isShowModal={isShowDeleteModal}
        handleShowModal={setIsShowDeleteModal}
        handleDeleteAllSelected={handleDeleteEmployee}
      />

      <AlertDeleteModal
        deleteIdx={employeeListLength === 0 ? deleteTeamIdx : false}
        title={
          employeeListLength === 0
            ? `Are you sure to delete team?`
            : `Can't delete team with people!`
        }
        message={
          employeeListLength === 0
            ? `Will delete this team!`
            : `You must delete all employees in this team!`
        }
        isShowModal={isShowDeleteTeamModal}
        handleShowModal={setIsShowDeleteTeamModal}
        handleDeleteAllSelected={
          employeeListLength === 0 ? handleDeleteTeam : setIsShowDeleteTeamModal
        }
      />
    </>
  );
}
