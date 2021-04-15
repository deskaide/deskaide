import React from 'react';
import styled, { withTheme } from 'styled-components';
import { useField } from 'formik';
import Flex from './Flex';
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

  label {
    color: ${({ theme }) => theme.colors.text};
    margin-left: ${({ theme }) => `${theme.space[2]}px`};
    margin-right: ${({ theme }) => `${theme.space[4]}px`};
  }
`;

const RadioInput = ({
  label,
  name,
  options = [],
  optionDisplay = 'inline',
}) => {
  const [field, meta, helpers] = useField({ name, type: 'radio' });

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <InputContainer>
      <div className="label-area">
        <Text>{label}</Text>
      </div>
      {options.map((option) => (
        <Flex key={option.value} display={optionDisplay}>
          <input
            type="radio"
            id={`radio_${option.value}`}
            name={name}
            onClick={() => setValue(option.value)}
            {...field}
            value={option.value}
            checked={value === option.value}
          />
          <label htmlFor={`radio_${option.value}`}>{option.name}</label>
        </Flex>
      ))}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </InputContainer>
  );
};

export default withTheme(RadioInput);
