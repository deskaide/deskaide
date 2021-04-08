import { useState } from 'react';
import styled from 'styled-components';

import Box from './Box';
import Button from './Button';
import Text from './Text';
import Modal from './Modal';
import ModalActions from './ModalActions';

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
      color: ${({ theme }) => theme.colors.light};
      cursor: pointer;

      &:last-child {
        border-right: none;
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
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleURLClick = (e) => {
    e.preventDefault();
    shell.openExternal(url);
  };

  const handleConfirmation = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleURLDelete = () => {
    setIsModalOpen(false);
    ipcRenderer.send('DELETE_BY_ID', _id);
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
          <Text onClick={handleURLClick}>{description}</Text>
        </div>

        <ul className="link-actions">
          <li>Add/Edit Tag</li>
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
        <Text variant="h5">Link deleted successfully!</Text>
      </Modal>
    </>
  );
};

export default LinkCard;
