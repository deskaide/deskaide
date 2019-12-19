import React, { useEffect, useRef } from 'react';
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

    .range-value {
      text-transform: lowercase;
    }

    p {
      margin-bottom: 0;
    }
  }

  input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 5px;
    outline: none;
    padding: 0;
    margin: 0;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.primary};
      cursor: pointer;
      transition: background 0.15s ease-in-out;
    }
  }
`;

const RangeInput = ({ label, ...props }) => {
  const rangeInput = useRef();
  const [field, meta] = useField({ ...props, type: 'range' });
  const fill =
    100 * (((meta.value || props.min) - props.min) / (props.max - props.min));
  const bg = `linear-gradient(
    90deg,
    ${props.theme.colors.primary} ${fill}%,
    ${props.theme.colors.text} ${fill + 0.1}%
  )`;

  useEffect(() => {
    if (rangeInput.current) {
      rangeInput.current.style.background = bg;
    }
  }, [rangeInput, bg]);

  return (
    <InputContainer fill={fill}>
      <div className="label-area">
        <Text>{label}</Text>
        <Text className="range-value">
          {meta.value || props.min} {props.unit}
        </Text>
      </div>
      <input
        type="range"
        {...field}
        {...props}
        ref={rangeInput}
        value={meta.value || props.min}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </InputContainer>
  );
};

export default withTheme(RangeInput);
