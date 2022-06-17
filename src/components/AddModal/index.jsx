import {
  ModalBody,
  ModalContainer,
  ModalContent,
  ModalHeader,
} from '../../common/Modal';
import { ModalTitle } from './AddModalStyles';

const AddModal = ({ Form, isShowModal, title, handleCloseModal }) => {
  return (
    <ModalContainer onClick={handleCloseModal} isShow={isShowModal}>
      <ModalContent>
        <div onClick={(e) => e.stopPropagation()}>
          <ModalHeader backgroundColor="#00BBF0" mt={2.4} pb={2.4}>
            <ModalTitle fontColor="#ffffff" fontSize={2.4}>
              {title}
            </ModalTitle>
          </ModalHeader>

          <ModalBody px={3.2}>{Form}</ModalBody>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default AddModal;
