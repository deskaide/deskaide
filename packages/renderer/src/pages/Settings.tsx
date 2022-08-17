import * as React from 'react';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { DefaultLayout } from '../layouts';
import {
  Box,
  Button,
  Text,
  SelectInput,
  Modal,
  ModalActions,
} from '../components';
import { defaultAppSettings } from '../config';
import { saveAppSettings } from '../store/settingsSlice';
import type { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';

export const Settings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const appSettings = useAppSelector(
    (state: RootState) => state.settings.appSettings
  );
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(saveAppSettings({ ...appSettings, ...defaultAppSettings }));
    setIsModalOpen(false);
  };

  return (
    <DefaultLayout>
      <Box m={4}>
        <Formik
          initialValues={{ ...appSettings }}
          enableReinitialize={true}
          validationSchema={Yup.object({
            theme: Yup.string().required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(saveAppSettings({ ...appSettings, ...values }));
            setSubmitting(false);
            setSuccessModal(true);
            setTimeout(() => {
              setSuccessModal(false);
            }, 1500);
          }}
        >
          <Form>
            <Text>App Settings</Text>
            <SelectInput
              name="theme"
              options={[
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
              ]}
              label="Theme"
            />
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="flex-end"
              mx={-3}
              mt={4}
            >
              <Box p={3} width={1 / 4}>
                <Button
                  type="button"
                  width="100%"
                  onClick={() => setIsModalOpen(true)}
                >
                  Reset
                </Button>
              </Box>
              <Box p={3} width={1 / 4} textAlign="right">
                <Button type="submit" variant="primary" width="100%">
                  Save
                </Button>
              </Box>
            </Box>
          </Form>
        </Formik>
        <Modal isOpen={isModalOpen} onClose={setIsModalOpen} p={32}>
          <Text mt={0} variant="h5">
            Do you really want to reset settings?
          </Text>
          <ModalActions mt={4}>
            <Button
              onClick={() => setIsModalOpen(false)}
              mr={3}
              variant="secondary"
            >
              No
            </Button>
            <Button onClick={handleReset} variant="warning">
              Yes
            </Button>
          </ModalActions>
        </Modal>
        <Modal isOpen={successModal} onClose={setSuccessModal} p={32}>
          <Text variant="h5">Settings saved successfully!</Text>
        </Modal>
      </Box>
    </DefaultLayout>
  );
};
