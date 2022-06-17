import { useRef, useState } from 'react';
import { CgTrash } from 'react-icons/cg';
import { MdAddCircleOutline } from 'react-icons/md';
import { IconButton } from '../../common/Button';
import { Table, TRow, TRowItem } from '../../common/Table';
import AddModal from '../AddModal';
import AddWorkingForm from '../AddWorkingForm';
import AlertDeleteModal from '../AlertDeleteModal';
import { Content } from '../InformationContent/InformationContentStyles';
import NoneSpinner from '../NoneSpinner';
import { Container, ContentTitle } from './WorkingContentStyles';

const WorkingContent = ({ title, data: resourceData, anotherField, name }) => {
  const formikRef = useRef();
  const [data, setData] = useState(resourceData);
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState(0);

  const handleAddNewWorking = (values) => {
    let newData = [...data];
    newData.push({
      no: newData.length + 1,
      deleted: false,
      date: values.date,
      [anotherField]: values.salaryPerHour,
    });
    handleCloseModal();
    setData(newData);
  };

  const handleDeleteWorking = (idx) => {
    const newData = data.map((item) => ({
      ...item,
      deleted: item.no === idx ? true : item.deleted,
    }));
    setData(newData);
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
          <NoneSpinner text="Don't have any working" />
        ) : (
          <Table type="secondary" widthCols={[10, 30, 30, 30]}>
            <TRow isRowTitle>
              <TRowItem>No</TRowItem>
              <TRowItem>Date</TRowItem>
              <TRowItem>{anotherField}</TRowItem>
              <TRowItem>Option</TRowItem>
            </TRow>

            {data.map((item) =>
              item.deleted ? null : (
                <TRow key={item.no}>
                  <TRowItem data-label="No">{item.no}</TRowItem>
                  <TRowItem data-label="Date">{item.date}</TRowItem>
                  <TRowItem data-label={anotherField}>
                    {item[anotherField]}
                  </TRowItem>
                  <TRowItem data-label="Option">
                    <IconButton
                      danger
                      pt="0"
                      pb="0"
                      onClick={() => handleShowDeleteEmployeeModal(item.no)}
                    >
                      <CgTrash />
                    </IconButton>
                  </TRowItem>
                </TRow>
              )
            )}
          </Table>
        )}
      </Content>
    </Container>
  );
};

export default WorkingContent;
