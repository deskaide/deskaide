import React from 'react';
import { Field, ErrorMessage } from 'formik';
import styled from 'styled-components';

import Text from './Text';

const InputContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg}px;

  .label-area {
    p {
      margin-top: 0;
      margin-bottom: ${({ theme }) => theme.space.sm}px;
    }
  }

  input[type='text'],
  input[type='password'] {
    border: none;
    background: none;
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.dark[2]};
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.text1};
    width: 100%;
    font-size: ${({ theme }) => theme.fontSizes.body};
    padding: ${({ theme }) => theme.space.md}px
      ${({ theme }) => theme.space.md}px;
  }

  .input-error {
    color: ${({ theme }) => theme.colors.error[1]};
    margin-top: ${({ theme }) => theme.space.sm}px;
    margin-bottom: ${({ theme }) => theme.space.lg}px;
    font-size: ${({ theme }) => theme.fontSizes.label1};
  }
`;

const Input: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  }
> = ({ label, ...props }) => {
  return (
    <InputContainer>
      {label && (
        <div className="label-area">
          <Text>{label}</Text>
        </div>
      )}

      <Field {...props} />
      <ErrorMessage
        name={props.name as string}
        component="p"
        className="input-error"
      />
    </InputContainer>
  );
};

export default Input;
