import React from 'react';
import { Formik, Form } from 'formik';

import { render, screen } from '../test-utils';

import { Input } from '../../src/components';

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
          <Input
            name="firstName"
            type="text"
            label="First Name"
            placeholder="john"
          />
          <Input name="lastName" type="text" label="Last Name" />
        </Form>
      </Formik>
    );
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
  });
});
