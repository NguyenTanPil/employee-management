import { useRef } from 'react';
import AddEmployeeForm from '../AddEmployeeForm';
import AddModal from '../AddModal';
import AlertDeleteModal from '../AlertDeleteModal';

export default function EmployeeDetailModals({
  employee,
  isShowDeleteModal,
  isShowEditModal,
  setIsShowEditModal,
  setIsShowDeleteModal,
  handleEditEmployee,
  handleDeleteEmployee,
}) {
  const formikRef = useRef();

  const handleCloseModal = () => {
    setIsShowEditModal(false);
    formikRef.current.resetFormik();
  };

  return (
    <>
      {isShowEditModal && (
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
      )}

      <AlertDeleteModal
        deleteIdx={employee.id}
        title={`Are you sure to delete this employee?`}
        message={`Will delete this employee!`}
        isShowModal={isShowDeleteModal}
        handleShowModal={setIsShowDeleteModal}
        handleDeleteAllSelected={handleDeleteEmployee}
      />
    </>
  );
}
