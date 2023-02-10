import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import {
  Box,
  Button,
  Editor,
  IconPlus,
  IconSearch,
  MarkdownPreview,
  NoteList,
  TitleInput,
} from '../components';
import { titleFromMdBody } from '../utils';
import { useAppDispatch, useAppSelector, useAutoSave } from '../hooks';
import {
  getAllNotes,
  getNoteById,
  deleteNoteById,
  resetCurrentNote,
  saveNote,
} from '../store/noteSlice';
import type { RootState } from '../store';
import type { INotePost } from '../types';

export const Notes: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allNotes, currentNote } = useAppSelector(
    (state: RootState) => state.notes
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isNewPost, setIsNewPost] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [doc, setDoc] = useState('');
  const [title, setTitle] = useState('');
  const [isTitleManuallyChanged, setIsTitleManuallyChanged] = useState(false);

  useEffect(() => {
    let isFetched = false;

    if (!isFetched) {
      dispatch(getAllNotes());
    }

    return () => {
      isFetched = true;
    };
  }, []);

  const notes = useMemo(() => {
    return allNotes.data.map((noteData) => noteData.doc);
  }, [allNotes.data]);

  useEffect(() => {
    if (!isNewPost && currentNote?._id && selectedNoteId !== currentNote._id) {
      setSelectedNoteId(currentNote._id);
    }

    if (!isNewPost && !currentNote && notes.length && notes[0]?._id) {
      setSelectedNoteId(notes[0]._id);
    }
  }, [notes, currentNote]);

  useEffect(() => {
    let isFetched = false;

    if (!isFetched && selectedNoteId) {
      dispatch(getNoteById(selectedNoteId))
        .unwrap()
        .then((note) => {
          setIsTitleManuallyChanged(true);
          setDoc(note.body);
          setTitle(note.title);
        });
    }

    return () => {
      isFetched = true;
    };
  }, [selectedNoteId]);

  const onFieldChange = useCallback(
    (field: string, value: string) => {
      if (field === 'title') {
        setTitle(value);
        setIsTitleManuallyChanged(true);
      }

      if (
        !isTitleManuallyChanged &&
        field === 'body' &&
        (!title || title.length < 80)
      ) {
        setTitle(titleFromMdBody(value));
      }
    },
    [isTitleManuallyChanged]
  );

  const handleDocChange = useCallback(
    (newDoc: string) => {
      setDoc(newDoc);
      onFieldChange('body', newDoc);
    },
    [isTitleManuallyChanged]
  );

  const handleDocSave = (data: INotePost) => {
    if (isEditing) {
      dispatch(
        saveNote({
          ...currentNote,
          body: data?.body,
          title: data?.title,
          date: data?.date,
        })
      );
      setIsNewPost(false);
    }
  };

  const newPost = useMemo<INotePost>(() => {
    return {
      ...(currentNote?._id && { _id: currentNote._id }),
      title,
      body: doc,
      date: currentNote?.date ?? new Date().toJSON(),
    };
  }, [title, doc, currentNote?._id]);

  useAutoSave(newPost, 500, handleDocSave);

  const handleSelctedNoteChange = (id: string) => {
    setIsEditing(false);
    setSelectedNoteId(id);
  };

  const handleCreateNewPost = () => {
    dispatch(resetCurrentNote());
    setIsNewPost(true);
    setSelectedNoteId('');
    setDoc('');
    setTitle('');
    setIsTitleManuallyChanged(false);
    setIsEditing(true);
  };

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setIsEditing(false);
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  const handlePreviewClick: React.MouseEventHandler<HTMLDivElement> =
    useCallback((e) => {
      if (e.detail === 2) {
        setIsEditing(true);
      }
    }, []);

  const handleOnBlur: React.FocusEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setIsEditing(false);
      }
    },
    []
  );

  const handleDeleteNote = (noteId?: string) => {
    if (!noteId) {
      return;
    }

    if (noteId === selectedNoteId) {
      setSelectedNoteId('');
      dispatch(resetCurrentNote());

      if (allNotes.data.length === 1) {
        handleCreateNewPost();
      }
    }

    dispatch(deleteNoteById(noteId));
  };

  return (
    <DefaultLayout>
      <WithSidebarLayout
        sidebarTitle="Notes"
        sidebar={
          <>
            <Box
              p="13px 12px 14px 12px"
              display="grid"
              gridTemplateColumns="2fr auto"
              gridGap={8}
              borderBottom="2px solid var(--color-bg-2)"
            >
              <Box>
                <input
                  style={{
                    width: '100%',
                    height: '100%',
                    outline: 'none',
                    border: 'none',
                    borderRadius: '4px',
                    color: 'var(--color-text-1)',
                    background: 'var(--color-bg-2)',
                    padding: '8px',
                  }}
                  placeholder="Search..."
                />
              </Box>
              <Box>
                <Button
                  py={1}
                  px={2}
                  marginRight={2}
                  icon={<IconSearch width={24} height={24} />}
                />
                <Button
                  py={1}
                  px={2}
                  icon={<IconPlus width={24} height={24} />}
                  onClick={handleCreateNewPost}
                />
              </Box>
            </Box>
            <NoteList
              selectedNote={currentNote?._id ?? ''}
              onItemClick={handleSelctedNoteChange}
              onItemDelete={handleDeleteNote}
              notes={notes}
            />
          </>
        }
      >
        <Box height="100vh" p={5}>
          <Box
            height="calc(100vh - 128px)"
            overflow="hidden"
            borderBottom="2px solid var(--color-bg-1)"
            position="relative"
            onBlur={handleOnBlur}
          >
            <div onClick={handlePreviewClick}>
              <TitleInput
                name="title"
                value={title}
                onChange={(e) => onFieldChange('title', e.target.value)}
                placeholder="New note title..."
                disabled={!isEditing}
              />
            </div>
            <Box pt="55px" height="100%">
              {isEditing && (
                <Editor
                  onChange={handleDocChange}
                  onBlur={() => {
                    return;
                  }}
                  initialDoc={doc}
                />
              )}
              {!isEditing && (
                <MarkdownPreview doc={doc} onClick={handlePreviewClick} />
              )}
            </Box>
          </Box>
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};
