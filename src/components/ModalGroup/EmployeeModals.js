import { useRef } from 'react';
import AddEmployeeForm from '../AddEmployeeForm';
import AddModal from '../AddModal';
import AlertDeleteModal from '../AlertDeleteModal';

export default function EmployeeModals({
  deleteIdx,
  teamList,
  isShowDeleteAllModal,
  isShowAddModal,
  isShowDeleteModal,
  setIsShowAddModal,
  handleAddNewEmployee,
  setIsShowDeleteAllModal,
  handleDeleteAllSelected,
  setIsShowDeleteModal,
}) {
  const formikRef = useRef();

  const handleCloseModal = () => {
    setIsShowAddModal(false);
    formikRef.current.resetFormik();
  };

  return (
    <>
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
    </>
  );
}
