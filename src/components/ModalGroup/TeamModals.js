import { useRef } from 'react';
import AddModal from '../AddModal';
import AddTeamForm from '../AddTeamForm';
import AlertDeleteModal from '../AlertDeleteModal';

export default function TeamModals({
  isShowAddModal,
  deleteIdx,
  isShowDeleteModal,
  setIsShowDeleteModal,
  setIsShowAddModal,
  handleAddNewTeam,
  handleDeleteEmployee,
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
    </>
  );
}
