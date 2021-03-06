import { Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import Text from './Text';

const InputContainer = styled.div`
  margin: 16px 0;

  .label-area {
    p {
      margin-top: 32px;
      margin-bottom: 0;
    }
  }

  input[type='text'],
  input[type='password'] {
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
          <Text>{fieldOptions.label.toUpperCase()}</Text>
        </div>
      )}

      <Field {...fieldOptions} />
      <ErrorMessage
        name={fieldOptions.name}
        component={errorOptions.component || 'div'}
      />
    </InputContainer>
  );
}

export default Input;
