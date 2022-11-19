import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 18px;
  padding: 0px 3em;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    margin-bottom: 20px;
  }
  select {
    text-align: center;
  }
  label {
    pointer-events: none;
    display: block;
  }
`;
