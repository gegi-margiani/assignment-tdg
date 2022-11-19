import { ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Person } from '../../types/people';
import Form from '../Form';
import { StyledDeleteButton } from '../Styled Components/Buttons.styled';
import { StyledModal, StyledOverlay } from './Modal.styled';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  isAdd: boolean;
  isUpdate: boolean;
  person: Person | any;
};

function Modal({ isOpen, toggle, isAdd, isUpdate, person }: Props) {
  return (
    <StyledOverlay isOpen={isOpen} onClick={toggle}>
      <StyledModal
        isOpen={isOpen}
        toggle={toggle}
        fade={false}
        autoFocus={false}
      >
        <ModalHeader>
          {isAdd ? (
            <span>Add Person</span>
          ) : isUpdate ? (
            <span>Update Person</span>
          ) : null}
        </ModalHeader>
        <ModalBody>
          <Form isAdd={isAdd} isUpdate={isUpdate} person={person} />
        </ModalBody>
        <ModalFooter>
          <StyledDeleteButton onClick={toggle}>Cancel</StyledDeleteButton>
        </ModalFooter>
      </StyledModal>
    </StyledOverlay>
  );
}

export default Modal;
