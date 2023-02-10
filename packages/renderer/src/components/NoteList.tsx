import styled, { css } from 'styled-components';
import { useContextMenu } from '../hooks';
import type { INotePost } from '../types';
import { Button } from './Button';
import { Modal } from './Modal';
import { Text } from './Text';
import { ModalActions } from './ModalActions';
import { useState } from 'react';

type Props = {
  notes: INotePost[];
  selectedNote: string;
  onItemClick: (id: string) => void;
  onItemDelete?: (id: string) => void;
};

const NoteListWrapper = styled.ul`
  height: calc(100vh - 135px);
  overflow: auto;
`;

const NoteListItem = styled.li`
  padding: 8px 16px;
  background: var(--color-bg-1);
  cursor: pointer;
  border-bottom: 2px solid var(--color-bg-0);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: ${({ theme }) => theme.fontSizes.body};

  &:hover,
  &.selected-note {
    background: var(--color-bg-2);
  }

  &::before {
    content: '';
    margin: 0;
  }

  &:last-child {
    border: none;
  }
`;

const ContextMenu = styled.div<{ top: number; left: number }>`
  position: absolute;
  width: auto;
  min-width: 120px;
  background-color: var(--color-text-1);
  border-radius: 4px;
  box-sizing: border-box;
  z-index: 100;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    box-sizing: border-box;
    margin: 0;
    list-style: none;
  }
  ul li {
    padding: 4px 12px;
    color: var(--color-bg-0);

    &::before {
      content: '';
      margin: 0;
    }

    &:first-child {
      &:hover {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
    }
    &:last-child {
      &:hover {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
  /* hover */
  ul li:hover {
    cursor: pointer;
    background-color: var(--color-text-2);
  }
`;

export const NoteList = ({
  notes,
  selectedNote,
  onItemClick,
  onItemDelete,
}: Props) => {
  const {
    clicked,
    setClicked,
    points,
    setPoints,
    selectedItemId,
    setSelectedItemId,
  } = useContextMenu();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <NoteListWrapper>
      {!notes.length && (
        <>
          <NoteListItem className={'selected-note'}>
            No note found!
          </NoteListItem>
        </>
      )}
      {notes.map((note) => (
        <NoteListItem
          key={note._id}
          className={selectedNote === note._id ? 'selected-note' : ''}
          onClick={() => onItemClick(note._id || '')}
          onContextMenu={(e) => {
            e.preventDefault();
            setClicked(true);
            setPoints({
              x: e.pageX,
              y: e.pageY,
            });
            setSelectedItemId(note._id);
          }}
        >
          {note.title}
        </NoteListItem>
      ))}
      {clicked && (
        <ContextMenu top={points.y} left={points.x}>
          <ul>
            <li onClick={() => setIsModalOpen(true)}>Delete</li>
          </ul>
        </ContextMenu>
      )}
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen} p={32}>
        <Text mt={0} variant="h5">
          Do you really want to delete this note?
        </Text>
        <ModalActions mt={4}>
          <Button
            onClick={() => setIsModalOpen(false)}
            mr={3}
            variant="secondary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              if (onItemDelete) {
                onItemDelete(selectedItemId || '');
                setIsModalOpen(false);
              }
            }}
            variant="warning"
          >
            Yes
          </Button>
        </ModalActions>
      </Modal>
    </NoteListWrapper>
  );
};
