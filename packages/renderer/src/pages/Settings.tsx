import * as React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { DefaultLayout } from '../layouts';
import { Box, Button, Input, RangeInput, SelectInput } from '../components';

export const Settings: React.FC = () => {
  return (
    <DefaultLayout>
      <Box m={4}>
        <Formik
          initialValues={{ firstName: '', lastName: '' }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            activeTheme: Yup.string().required('Required'),
            shortBreakTime: Yup.number()
              .min(5, 'Must be at least 5 minutes')
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
            <SelectInput
              name="activeTheme"
              options={[
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
              ]}
              label="Active Theme"
            />
            <RangeInput
              min={0}
              max={25}
              unit="min"
              name="shortBreakTime"
              label="Range input"
            />
            <Button type="submit">Save Settings</Button>
          </Form>
        </Formik>
      </Box>
    </DefaultLayout>
  );
};
