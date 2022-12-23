import * as React from 'react';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import {
  Box,
  Button,
  Text,
  SelectInput,
  Modal,
  ModalActions,
  MenuList,
  MenuListItem,
} from '../components';
import { defaultAppSettings } from '../config';
import { saveAppSettings } from '../store/settingsSlice';
import type { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '../hooks';
import { sendNotification } from '../utils';

export type MenuListItem = {
  label: string;
  value: string | number;
};

const menuItems: MenuListItem[] = [
  // { label: 'General', value: 0 },
  { label: 'Appearance', value: 0 },
  { label: 'Others', value: 1 },
];

export const Settings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuListItem>(
    menuItems[0]
  );
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
      <WithSidebarLayout
        sidebarTitle="Settings"
        sidebar={
          <Box p={4}>
            <MenuList>
              {menuItems.map((item) => (
                <MenuListItem
                  className={
                    item.value === selectedMenuItem.value ? 'active' : ''
                  }
                  onClick={() => {
                    setSelectedMenuItem(item);
                  }}
                  key={item.value}
                >
                  {item.label}
                </MenuListItem>
              ))}
            </MenuList>
          </Box>
        }
      >
        <Box m={4}>
          {selectedMenuItem.value === 0 && (
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
                  <Box p={3} width={[1, 1, 1 / 2, 1 / 2]}>
                    <Button
                      type="button"
                      width="100%"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Reset
                    </Button>
                  </Box>
                  <Box p={3} width={[1, 1, 1 / 2, 1 / 2]} textAlign="right">
                    <Button type="submit" variant="primary" width="100%">
                      Save
                    </Button>
                  </Box>
                </Box>
              </Form>
            </Formik>
          )}
          {selectedMenuItem.value === 1 && (
            <>
              <Text borderBottom="1px dotted var(--color-dark-2)" pb={2}>
                Troubleshoot
              </Text>
              <ul>
                <li>
                  Notification is not showing:{' '}
                  <Button
                    p="4px 8px"
                    fontSize="1rem"
                    onClick={() => {
                      sendNotification({
                        title: 'Deskaide',
                        body: 'Notification shown successfully!',
                      });
                    }}
                  >
                    Test Notification
                  </Button>
                </li>
              </ul>
            </>
          )}
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
      </WithSidebarLayout>
    </DefaultLayout>
  );
};
