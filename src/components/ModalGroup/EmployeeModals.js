import { useRef } from 'react';
import AddEmployeeForm from '../AddEmployeeForm';
import AddModal from '../AddModal';
import AlertDeleteModal from '../AlertDeleteModal';

export default function EmployeeModals({
  deleteIdx,
  isShowDeleteAllModal,
  isShowAddModal,
  isShowDeleteModal,
  totalSelected,
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
      {isShowAddModal && (
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
      )}

      <AlertDeleteModal
        title="Are you sure delete all selected employees?"
        message={`Will delete ${totalSelected} employees!`}
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
