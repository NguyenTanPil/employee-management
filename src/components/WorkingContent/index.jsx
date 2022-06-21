import { useRef, useState } from 'react';
import { CgTrash } from 'react-icons/cg';
import { MdAddCircleOutline } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IconButton } from '../../common/Button';
import { Table, TRow, TRowItem } from '../../common/Table';
import AddModal from '../AddModal';
import AddWorkingForm from '../AddWorkingForm';
import AlertDeleteModal from '../AlertDeleteModal';
import { Content } from '../InformationContent/InformationContentStyles';
import LoadingSpinner from '../LoadingSpinner';
import NoneSpinner from '../NoneSpinner';
import { Container, ContentTitle } from './WorkingContentStyles';

const WorkingContent = ({
  title,
  employeeId,
  anotherField,
  name,
  fetchFn,
  createFn,
  deleteFn,
}) => {
  const queryClient = useQueryClient();

  // state
  const formikRef = useRef();
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(0);
  const { data, isLoading, error } = useQuery(`get${title}`, () =>
    fetchFn(employeeId)
  );

  // functions
  const { mutate: createNewItemMutate } = useMutation(createFn, {
    onSuccess(newItem) {
      queryClient.setQueryData(`get${title}`, [...data, newItem]);
    },
  });

  const { mutate: deleteItemMutate } = useMutation(deleteFn, {
    onSuccess(deleteItem) {
      queryClient.setQueryData(`get${title}`, (prev) =>
        prev.filter((item) => item.id !== deleteItem.id)
      );

      // reset delete index
      setDeleteIdx(0);
    },
  });

  const handleAddNewWorking = (values) => {
    const newItem = {
      id: data.length + 1 + employeeId,
      employeeId,
      deleted: false,
      date: values.date,
      [anotherField]: values.salaryPerHour,
    };
    handleCloseModal();
    createNewItemMutate(newItem);
  };

  const handleDeleteWorking = (idx) => {
    deleteItemMutate(idx);
    setIsShowDeleteModal(false);
  };

  const handleCloseModal = () => {
    setIsShowAddModal(false);
    formikRef.current.resetFormik();
  };

  const handleShowDeleteEmployeeModal = (idx) => {
    setDeleteIdx(idx);
    setIsShowDeleteModal(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Container>
      <AddModal
        title={`Add new ${name}`}
        Form={
          <AddWorkingForm
            ref={formikRef}
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

      <ContentTitle>
        <h3>{title}</h3>
        <IconButton active onClick={() => setIsShowAddModal(true)}>
          <MdAddCircleOutline />
        </IconButton>
      </ContentTitle>
      <Content>
        {data.filter((item) => !item.deleted).length === 0 ? (
          <NoneSpinner text={`Don't have any ${name}`} />
        ) : (
          <Table type="secondary" widthCols={[10, 30, 30, 30]}>
            <TRow isRowTitle>
              <TRowItem>No</TRowItem>
              <TRowItem>Date</TRowItem>
              <TRowItem>{anotherField}</TRowItem>
              <TRowItem>Option</TRowItem>
            </TRow>

            {data.map((item) => (
              <TRow key={item.id}>
                <TRowItem data-label="No">{item.id}</TRowItem>
                <TRowItem data-label="Date">{item.date}</TRowItem>
                <TRowItem data-label={anotherField}>
                  {item[anotherField]}
                </TRowItem>
                <TRowItem data-label="Option">
                  <IconButton
                    danger
                    pt="0"
                    pb="0"
                    onClick={() => handleShowDeleteEmployeeModal(item.id)}
                  >
                    <CgTrash />
                  </IconButton>
                </TRowItem>
              </TRow>
            ))}
          </Table>
        )}
      </Content>
    </Container>
  );
};

export default WorkingContent;
