import { useRef } from 'react';
import AddModal from '../AddModal';
import AddTeamForm from '../AddTeamForm';

export default function TeamModals({
  isShowAddModal,
  setIsShowAddModal,
  handleAddNewTeam,
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
    </>
  );
}
