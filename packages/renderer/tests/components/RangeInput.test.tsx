import React from 'react';
import { Formik, Form } from 'formik';

import { render, screen } from '../test-utils';

import { RangeInput } from '../../src/components';

describe('Input', () => {
  test('renders Input component', () => {
    render(
      <Formik
        initialValues={{ firstName: '', lastName: '' }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <RangeInput
            name="input1"
            label="Input 1"
            min={0}
            max={100}
            unit="minutes"
          />
          <RangeInput
            name="input2"
            label="Input 2"
            min={0}
            max={100}
            unit="minutes"
            value={25}
          />
        </Form>
      </Formik>
    );
    expect(screen.getByText(/Input 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Input 2/i)).toBeInTheDocument();
  });
});
