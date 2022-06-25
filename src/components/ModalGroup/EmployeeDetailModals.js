import { useRef } from 'react';
import AddEmployeeForm from '../AddEmployeeForm';
import AddModal from '../AddModal';
import AlertDeleteModal from '../AlertDeleteModal';
import AddTeamForm from '../AddTeamForm';

export default function EmployeeDetailModals({
  employee,
  isShowDeleteModal,
  isShowEditModal,
  isShowUpdateAvatarModal,
  setIsShowEditModal,
  setIsShowDeleteModal,
  handleEditEmployee,
  handleDeleteEmployee,
  setIsShowUpdateAvatarModal,
  handleUpdateEmployeeAvatar,
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

      <AddModal
        title="update employee avatar"
        Form={
          <AddTeamForm
            ref={formikRef}
            placeholder="Employee avatar"
            handleShowModal={setIsShowUpdateAvatarModal}
            handleAddNewEmployee={handleUpdateEmployeeAvatar}
          />
        }
        isShowModal={isShowUpdateAvatarModal}
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
