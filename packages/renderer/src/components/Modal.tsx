import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import type { SpaceProps, LayoutProps } from 'styled-system';
import { space, layout } from 'styled-system';

import { useOnClickOutside } from '../hooks';

type ModalBackdropProp = { isOpen: boolean };

const ModalBackdrop = styled.div<ModalBackdropProp>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${({ isOpen = true }) => (isOpen ? 'block' : 'none')};
  z-index: 999;
`;

const ModalContainer = styled.div`
  position: fixed;
  background: ${({ theme }) => theme.colors.bg1};
  color: ${({ theme }) => theme.colors.text1};
  width: auto;
  max-width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  padding: 16px;
  border-radius: 4px;
  transform: translate(-50%, -50%);
  z-index: 1000;
  box-shadow: 0 -2px 16px rgba(0, 0, 0, 1);
  ${space};
  ${layout};
`;

type ModalProps = SpaceProps &
  LayoutProps & {
    isOpen: boolean;
    onClose: (isOpen: boolean) => void;
    children: React.ReactNode;
  };

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  ...props
}) => {
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => onClose(false));

  const content = (
    <ModalBackdrop isOpen={isOpen}>
      <ModalContainer ref={modalRef} {...props}>
        {children}
      </ModalContainer>
    </ModalBackdrop>
  );
  return createPortal(content, document.body);
};
