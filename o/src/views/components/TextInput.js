import React from 'react';
import styled, { withTheme } from 'styled-components';
import { useField } from 'formik';
import Text from './Text';

const InputContainer = styled.div`
  margin-bottom: ${({ theme }) => `${theme.space[3]}px`};

  .label-area {
    width: 100%;
    display: inline-flex;
    text-transform: uppercase;
    justify-content: space-between;

    p {
      margin-bottom: 0;
    }
  }

  input {
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

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <InputContainer>
      <div className="label-area">
        <Text>{label}</Text>
      </div>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </InputContainer>
  );
};

export default withTheme(TextInput);
