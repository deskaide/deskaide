import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { DefaultLayout } from '../layouts';
import { Box, Button, Input } from '../components';

const Settings: React.FC = () => {
  return (
    <DefaultLayout>
      <Box m={4}>
        <Formik
          initialValues={{ firstName: '', lastName: '' }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            lastName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
          })}
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

            <Button type="submit">Save Settings</Button>
          </Form>
        </Formik>
      </Box>
    </DefaultLayout>
  );
};

export default Settings;
