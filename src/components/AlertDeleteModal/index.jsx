import { useTheme } from 'styled-components';
import { TextButton } from '../../common/Button';
import {
  ModalBody,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '../../common/Modal';
import { ModalTitle } from '../AddModal/AddModalStyles';

const AlertDeleteModal = ({
  deleteIdx,
  title,
  message,
  isShowModal,
  handleShowModal,
  handleDeleteAllSelected,
}) => {
  const theme = useTheme();
  const handleDeleteYesOption = () => {
    handleShowModal(false);
    handleDeleteAllSelected(deleteIdx);
  };

  return (
    <ModalContainer onClick={() => handleShowModal(false)} isShow={isShowModal}>
      <ModalContent>
        <div onClick={(e) => e.stopPropagation()}>
          <ModalHeader mt={0} pb={1.2}>
            <ModalTitle fontColor={theme.fontColor} fontSize={2}>
              {title}
            </ModalTitle>
          </ModalHeader>
          <ModalBody px={1.6}>
            <p>{message}</p>
          </ModalBody>
          <ModalFooter pl={1.6} pr={1.6} pb={2.4}>
            <TextButton onClick={() => handleShowModal(false)}>NO</TextButton>
            <TextButton danger active onClick={handleDeleteYesOption}>
              YES
            </TextButton>
          </ModalFooter>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default AlertDeleteModal;
