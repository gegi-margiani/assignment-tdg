import { Person } from '../../types/people';
import Form from '../Form';
import { StyledDeleteButton } from '../Styled Components/Buttons.styled';
import { StyledModal } from './Modal.styled';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  isAdd: boolean;
  isUpdate: boolean;
  person: Person | any;
};

function Modal({ isOpen, toggle, isAdd, isUpdate, person }: Props) {
  return (
    <StyledModal
      open={isOpen}
      title={isAdd ? <span>Add Person</span> : <span>Update Person</span>}
      footer={null}
      closable
      keyboard
      maskClosable
      onCancel={toggle}
    >
      <Form
        isAdd={isAdd}
        isUpdate={isUpdate}
        person={person}
        toggleModal={toggle}
      />
      <StyledDeleteButton onClick={toggle}>Cancel</StyledDeleteButton>
    </StyledModal>
  );
}

export default Modal;
