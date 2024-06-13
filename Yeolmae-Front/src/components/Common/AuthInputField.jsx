import styled from 'styled-components';

const AuthInputField = styled.input`
  display: flex;
  width: 80%;
  flex-basis: 50%;
  margin: 5px 0 10px 0;
  border: none;
  border-bottom: 2px solid rgba(220, 220, 220, 1);
  padding: 10px 0px;
  font-family: NotoSans Regular;

  &: focus {
    outline: none;
    border-bottom: 2px solid rgba(101, 88, 245, 1);
  }
`;

export default AuthInputField;
