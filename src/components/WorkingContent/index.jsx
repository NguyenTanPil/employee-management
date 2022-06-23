import { useState } from 'react';
import { CgTrash } from 'react-icons/cg';
import { MdAddCircleOutline } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { IconButton } from '../../common/Button';
import { Table, TRow, TRowItem } from '../../common/Table';
import {
  useCreateNewItem,
  useDeleteItem,
  useGetWorkingData,
} from '../hooks/working';
import { Content } from '../InformationContent/InformationContentStyles';
import LoadingSpinner from '../LoadingSpinner';
import WorkingModals from '../ModalGroup/WorkingModals';
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
  // state
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(0);
  const { data, isLoading, error } = useGetWorkingData({
    title,
    employeeId,
    fetchFn,
  });

  // functions
  const { mutate: createNewItemMutate } = useCreateNewItem({
    title,
    employeeId,
    createFn,
  });

  const { mutate: deleteItemMutate } = useDeleteItem({
    title,
    employeeId,
    deleteFn,
  });

  const handleAddNewWorking = (values) => {
    const newItem = {
      id: uuidv4(),
      employeeId,
      deleted: false,
      date: values.date,
      [anotherField]: values.salaryPerHour,
    };

    createNewItemMutate(newItem);
    setIsShowAddModal(false);
  };

  const handleDeleteWorking = (idx) => {
    deleteItemMutate(idx);
    setIsShowDeleteModal(false);
    setDeleteIdx(0);
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
      <WorkingModals
        name={name}
        isShowAddModal={isShowAddModal}
        deleteIdx={deleteIdx}
        isShowDeleteModal={isShowDeleteModal}
        setIsShowDeleteModal={setIsShowDeleteModal}
        setIsShowAddModal={setIsShowAddModal}
        handleAddNewWorking={handleAddNewWorking}
        handleDeleteWorking={handleDeleteWorking}
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

            {data.map((item, idx) => (
              <TRow key={item.id}>
                <TRowItem data-label="No">{idx + 1}</TRowItem>
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
