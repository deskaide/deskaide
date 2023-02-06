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
  resetCurrentNote,
  saveNote,
} from '../store/noteSlice';
import type { RootState } from '../store';
import type { INotePost } from '../types';

export const Notes: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(true);
  const [selectedNote, setSelectedNote] = useState('');
  const [doc, setDoc] = useState('');
  const [title, setTitle] = useState('');
  // const [isEditing, setIsEditing] = useState(true);
  const [isTitleManuallyChanged, setIsTitleManuallyChanged] = useState(false);
  const [_isCreatingNewNote, setIsCreatingNewNote] = useState(false);

  const { allNotes, currentNote } = useAppSelector(
    (state: RootState) => state.notes
  );
  const notes = useMemo(() => {
    return allNotes.data.map((noteData) => noteData.doc);
  }, [allNotes]);

  useEffect(() => {
    if (!selectedNote && notes.length && notes[0]?._id) {
      setSelectedNote(notes[0]._id);
      setIsTitleManuallyChanged(true);
      setTitle(notes[0].title);
      setDoc(notes[0].body);
    }
  }, [notes]);

  useEffect(() => {
    let isFetched = false;

    if (!isFetched) {
      dispatch(getAllNotes());
    }

    return () => {
      isFetched = true;
    };
  }, []);

  useEffect(() => {
    let isFetched = false;

    if (!isFetched && selectedNote) {
      dispatch(getNoteById(selectedNote))
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
  }, [selectedNote]);

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
    setSelectedNote(id);
  };

  const handleCreateNewPost = () => {
    setIsCreatingNewNote(true);
    dispatch(resetCurrentNote());
    setSelectedNote('');
    setDoc('');
    setTitle('');
    setIsTitleManuallyChanged(false);
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

  console.log(allNotes);

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
              selectedNote={selectedNote}
              onItemClick={handleSelctedNoteChange}
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
          >
            <TitleInput
              name="title"
              value={title}
              onChange={(e) => onFieldChange('title', e.target.value)}
              placeholder="New note title..."
            />
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
