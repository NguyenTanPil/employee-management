import { useRef } from 'react';
import AddEmployeeForm from '../AddEmployeeForm';
import AddModal from '../AddModal';
import AlertDeleteModal from '../AlertDeleteModal';

export default function EmployeeDetailModals({
  employee,
  teamList,
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
        title={`Are you sure to delete this employee?`}
        message={`Will delete this employee!`}
        isShowModal={isShowDeleteModal}
        handleShowModal={setIsShowDeleteModal}
        handleDeleteAllSelected={handleDeleteEmployee}
      />
    </>
  );
}
