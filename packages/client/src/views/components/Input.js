import { Field, ErrorMessage } from "formik";
import styled from "styled-components";
import Text from "./Text";

const InputContainer = styled.div`
  margin-bottom: 16px;

  input[type="text"] {
    border: none;
    background: none;
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
    font-size: 1rem;
    padding: 4px;
  }
`;

function Input({ fieldOptions = {}, errorOptions = {} }) {
  return (
    <InputContainer>
      {fieldOptions.label && (
        <div className="label-area">
          <Text>{fieldOptions.label}</Text>
        </div>
      )}

      <Field {...fieldOptions} />
      <ErrorMessage
        name={fieldOptions.name}
        component={errorOptions.component || "div"}
      />
    </InputContainer>
  );
}

export default Input;
