import { Modal } from 'antd';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  position: fixed;
  top: 40vh;
  left: 50vw;
  transform: translate(-40%, -50%);
  padding: 1em 0em;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  span {
    font-size: 1.5em;
  }
`;
