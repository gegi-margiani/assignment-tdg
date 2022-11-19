import { Modal } from 'reactstrap';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  min-height: 50vh;
  min-width: 40vw;
  padding: 1em 0em;
  background-color: white;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  span {
    font-size: 1.5em;
  }
`;

type overlayProps = {
  isOpen: boolean;
};
export const StyledOverlay = styled.div<overlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.5);
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;
