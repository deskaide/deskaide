import * as React from 'react';
import { useCallback, useState } from 'react';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import {
  Box,
  Button,
  Editor,
  IconPlus,
  IconSearch,
  NoteList,
  TitleInput,
} from '../components';
import { titleFromMdBody } from '../utils';

const notes = [
  {
    _id: '123',
    title: 'Desiging A Colorscheme',
    body: '',
    date: '',
  },
  {
    _id: '124',
    title: 'জাভাস্ক্রিপ্ট নিয়ে কিছু ভুল ধারণা',
    body: '',
    date: '',
  },
  {
    _id: '125',
    title: 'Create A Movies List App using React.js And Node.js for API',
    body: '',
    date: '',
  },
  {
    _id: '126',
    title: 'HTML Course Plan',
    body: '',
    date: '',
  },
  {
    _id: '127',
    title: 'Desiging A Colorscheme',
    body: '',
    date: '',
  },
  {
    _id: '128',
    title: 'জাভাস্ক্রিপ্ট নিয়ে কিছু ভুল ধারণা',
    body: '',
    date: '',
  },
  {
    _id: '129',
    title: 'Create A Movies List App using React.js And Node.js for API',
    body: '',
    date: '',
  },
  {
    _id: '146',
    title: 'HTML Course Plan',
    body: '',
    date: '',
  },
  {
    _id: '123a',
    title: 'Desiging A Colorscheme',
    body: '',
    date: '',
  },
  {
    _id: '124a',
    title: 'জাভাস্ক্রিপ্ট নিয়ে কিছু ভুল ধারণা',
    body: '',
    date: '',
  },
  {
    _id: '125a',
    title: 'Create A Movies List App using React.js And Node.js for API',
    body: '',
    date: '',
  },
  {
    _id: '126a',
    title: 'HTML Course Plan',
    body: '',
    date: '',
  },
  {
    _id: '127a',
    title: 'Desiging A Colorscheme',
    body: '',
    date: '',
  },
  {
    _id: '128a',
    title: 'জাভাস্ক্রিপ্ট নিয়ে কিছু ভুল ধারণা',
    body: '',
    date: '',
  },
  {
    _id: '129a',
    title: 'Create A Movies List App using React.js And Node.js for API',
    body: '',
    date: '',
  },
  {
    _id: '146a',
    title: 'HTML Course Plan',
    body: '',
    date: '',
  },
];

export const Notes: React.FC = () => {
  const [selectedNote, setSelectedNote] = useState('123');
  const [doc, setDoc] = useState('');
  const [title, setTitle] = useState('');
  // const [isEditing, setIsEditing] = useState(true);
  const [isTitleManuallyChanged, setIsTitleManuallyChanged] = useState(false);
  const [_isCreatingNewNote, setIsCreatingNewNote] = useState(false);

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

  /* const handleOnBlur: React.FocusEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setIsEditing(false);
      }
    },
    []
  ); */

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
                  onClick={() => {
                    setSelectedNote('');
                    setIsCreatingNewNote(true);
                  }}
                />
              </Box>
            </Box>
            <NoteList
              selectedNote={selectedNote}
              onItemClick={(id) => setSelectedNote(id)}
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
              <Editor
                onChange={handleDocChange}
                onBlur={() => console.log('In preview mode!')}
                initialDoc={doc}
              />
            </Box>
          </Box>
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};
