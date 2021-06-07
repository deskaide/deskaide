import { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';

import getTitleCase from '../../utils/getTitleCase';
import Box from './Box';
import Button from './Button';
import Text from './Text';
import Modal from './Modal';
import ModalActions from './ModalActions';
import Input from './Input';

import { ReactComponent as HashIcon } from '../../assets/icons/hash.svg';

const electron = window.require('electron');
const { shell, ipcRenderer } = electron;

const Wrapper = styled(Box)`
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.lightDark};
  border-top: none;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  word-break: break-word;
  position: relative;

  .link-image {
    height: 240px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.lightDark};
    background-image: ${({ bgImage }) => `url(${bgImage})`};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }

  .link-meta {
    padding: 16px;
    padding-bottom: 54px;
  }

  .link-image,
  .link-meta h4,
  .link-meta p {
    cursor: pointer;
  }

  .link-actions {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;

    li {
      display: inline-block;
      text-align: center;
      padding: 8px 16px;
      width: 100%;
      border-top: 1px solid ${({ theme }) => theme.colors.lightDark};
      border-right: 1px solid ${({ theme }) => theme.colors.lightDark};
      color: ${({ theme }) => theme.colors.text};
      cursor: pointer;

      &:last-child {
        border-right: none;
      }

      svg {
        position: relative;
        top: 2px;
        margin-right: 8px;
      }
    }
  }
`;

const LinkCard = ({
  _id,
  title = '',
  url = '',
  image = '',
  description = '',
  tag,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleURLClick = (e) => {
    e.preventDefault();
    shell.openExternal(url);
  };

  const handleConfirmation = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    setIsTagModalOpen(true);
  };

  const handleURLDelete = () => {
    setIsModalOpen(false);
    ipcRenderer.send('DELETE_BY_ID', _id);
    setSuccessMessage('Link deleted successfully!');
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
    }, 1500);
  };

  return (
    <>
      <Wrapper bgImage={image}>
        <div className="link-image" onClick={handleURLClick} />
        <div className="link-meta">
          <Text variant="h4" onClick={handleURLClick} color="primary">
            {title}
          </Text>
          <Text onClick={handleURLClick}>
            {description?.length > 64
              ? `${description.substr(0, 64)}...`
              : description}
          </Text>
        </div>

        <ul className="link-actions">
          <li onClick={handleAddTag}>
            <HashIcon width={16} height={16} />
            {tag ? getTitleCase(tag.split('tags_')[1]) : 'Add Tag'}
          </li>
          <li onClick={handleConfirmation}>Delete</li>
        </ul>
      </Wrapper>
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen} p={32}>
        <Text mt={0} variant="h5">
          Do you really want to delete the link?
        </Text>
        <ModalActions mt={4}>
          <Button onClick={() => setIsModalOpen(false)} mr={3}>
            No
          </Button>
          <Button onClick={handleURLDelete}>Yes</Button>
        </ModalActions>
      </Modal>
      <Modal isOpen={successModal} onClose={setSuccessModal} p={32}>
        <Text variant="h5">{successMessage}</Text>
      </Modal>
      <Modal
        isOpen={isTagModalOpen}
        onClose={setIsTagModalOpen}
        p={32}
        width="40vw"
      >
        <Text mt={0} variant="h5">
          Link Tag:
        </Text>
        <Formik
          initialValues={{ tag: tag ? tag.split('tags_')[1] : '' }}
          onSubmit={async (values, actions) => {
            setIsTagModalOpen(false);
            ipcRenderer.send('ADD_TAG', { tag: values.tag, itemId: _id });
            actions.resetForm({ tag: '' });
            actions.setSubmitting(false);
            setSuccessMessage('Tag added successfully!');
            setSuccessModal(true);
            setTimeout(() => {
              setSuccessModal(false);
            }, 1500);
          }}
          enableReinitialize
        >
          <Form>
            <Input
              fieldOptions={{
                name: 'tag',
                type: 'text',
                placeholder: 'Enter tag name...',
              }}
            />
            <ModalActions mt={4}>
              <Button
                type="button"
                onClick={() => setIsTagModalOpen(false)}
                mr={3}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </ModalActions>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default LinkCard;
