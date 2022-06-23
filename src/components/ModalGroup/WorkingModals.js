import { useRef } from 'react';
import AddModal from '../AddModal';
import AddWorkingForm from '../AddWorkingForm';
import AlertDeleteModal from '../AlertDeleteModal';

export default function WorkingModals({
  name,
  isShowAddModal,
  deleteIdx,
  isShowDeleteModal,
  setIsShowDeleteModal,
  setIsShowAddModal,
  handleAddNewWorking,
  handleDeleteWorking,
}) {
  const formikRef = useRef();

  const handleCloseModal = () => {
    setIsShowAddModal(false);
    formikRef.current.resetFormik();
  };

  return (
    <>
      <AddModal
        title={`Add new ${name}`}
        Form={
          <AddWorkingForm
            ref={formikRef}
            name={name}
            handleShowModal={setIsShowAddModal}
            handleAddNewEmployee={handleAddNewWorking}
          />
        }
        isShowModal={isShowAddModal}
        handleCloseModal={handleCloseModal}
      />

      <AlertDeleteModal
        deleteIdx={deleteIdx}
        title={`Are you sure to delete ${name}?`}
        message={`Will delete this ${name}!`}
        isShowModal={isShowDeleteModal}
        handleShowModal={setIsShowDeleteModal}
        handleDeleteAllSelected={handleDeleteWorking}
      />
    </>
  );
}
