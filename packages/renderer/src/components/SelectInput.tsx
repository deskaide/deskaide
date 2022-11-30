import * as React from 'react';
import { Field, ErrorMessage } from 'formik';
import styled from 'styled-components';

import { Text } from './Text';

const InputContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.space.lg}px;

  .label-area {
    p {
      margin-top: 0;
      margin-bottom: ${({ theme }) => theme.space.sm}px;
    }
  }

  select {
    background: none;
    outline: none;
    border: 1px solid var(--color-dark-2);
    border-radius: 4px;
    color: var(--color-text-1);
    width: 100%;
    font-size: 18px;
    padding: 8px 8px;
    appearance: none;
    background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 8.98213L12 16.9821L20 8.98213L18.0179 7L12 13.0179L5.98213 7L4 8.98213Z' fill='%23${({
        theme,
      }) => theme.colors.dark[2].substring(1)}'/%3E%3C/svg%3E%0A")
      no-repeat right 8px center;
  }

  .input-error {
    color: ${({ theme }) => theme.colors.error[1]};
    margin-top: ${({ theme }) => theme.space.sm}px;
    margin-bottom: ${({ theme }) => theme.space.lg}px;
    font-size: ${({ theme }) => theme.fontSizes.label1};
  }
`;

type Option<T> = {
  label: string;
  value: T;
};

type Props<T> = {
  label?: string;
  options: Option<T>[];
};

export const SelectInput = <T extends string | number>({
  label,
  options,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & Props<T>) => {
  return (
    <InputContainer>
      {label && (
        <div className="label-area">
          <label htmlFor={`input-${props.name}`}>
            <Text>{label}</Text>
          </label>
        </div>
      )}

      <Field
        {...props}
        id={`input-${props.name}`}
        as="select"
        aria-label={props.name}
      >
        {options.map((option: Option<T>) => (
          <option value={option.value} key={option.label}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name={props.name as string}
        component="p"
        className="input-error"
      />
    </InputContainer>
  );
};
