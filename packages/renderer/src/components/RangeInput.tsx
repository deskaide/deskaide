import * as React from 'react';
import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useField } from 'formik';

import { Text } from './Text';

const InputContainer = styled.div`
  margin-bottom: ${({ theme }) => `${theme.space.lg}px`};
  width: 100%;
  position: relative;

  .label-area {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;

    .range-value {
      text-transform: lowercase;
    }

    p {
      margin-top: 0;
      margin-bottom: ${({ theme }) => theme.space.sm}px;
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
      background: ${({ theme }) => theme.colors.primary[1]};
      cursor: pointer;
      transition: background 0.15s ease-in-out;
    }
  }

  .input-error {
    color: ${({ theme }) => theme.colors.error[1]};
    margin-top: ${({ theme }) => theme.space.sm}px;
    margin-bottom: ${({ theme }) => theme.space.lg}px;
    font-size: ${({ theme }) => theme.fontSizes.label1};
  }
`;

export const RangeInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    min: number;
    max: number;
    unit: string;
    name: string;
  }
> = ({ label, min, max, unit, ...props }) => {
  const theme = useTheme();
  const [bg, setBg] = useState('');
  const [field, meta] = useField({ ...props, type: 'range' });
  const fill = 100 * (((meta.value || min) - min) / (max - min));

  useEffect(() => {
    setBg(`linear-gradient(
    90deg,
    ${theme.colors.primary[1]} ${fill}%,
    ${theme.colors.text1} ${fill + 0.1}%
  )`);
    return () => setBg('');
  }, [fill, theme]);

  return (
    <InputContainer>
      <div className="label-area">
        <label htmlFor={`range-input-${props.name}`}>
          <Text>{label}</Text>
        </label>
        <Text>{`${meta.value || min} ${unit}`}</Text>
      </div>
      <input
        type="range"
        {...field}
        {...props}
        min={min}
        max={max}
        style={{ background: bg }}
        value={meta.value || min}
        id={`input-${props.name}`}
        aria-label={props.name}
      />
      {meta.touched && meta.error ? (
        <div className="input-error">{meta.error}</div>
      ) : null}
    </InputContainer>
  );
};
