import styled from 'styled-components';
import type { INotePost } from '../types';

type Props = {
  notes: INotePost[];
  selectedNote: string;
  onItemClick: (id: string) => void;
};

const NoteListWrapper = styled.ul``;

const NoteListItem = styled.li`
  padding: 4px 8px;
  background: var(--color-bg-1);
  cursor: pointer;
  border-bottom: 1px dotted var(--color-dark-2);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

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

export const NoteList = ({ notes, selectedNote, onItemClick }: Props) => {
  return (
    <NoteListWrapper>
      {notes.map((note) => (
        <NoteListItem
          key={note._id}
          className={selectedNote === note._id ? 'selected-note' : ''}
          onClick={() => onItemClick(note._id || '')}
        >
          {note.title}
        </NoteListItem>
      ))}
    </NoteListWrapper>
  );
};
