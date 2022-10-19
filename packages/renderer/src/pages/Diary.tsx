import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { format } from 'date-fns';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, DiaryEditor, DiaryPreview, Calendar, Text } from '../components';
import { useAutoSave, useMarkdownCounts } from '../hooks';
import { useAppDispatch, useAppSelector } from '../hooks';
import type { RootState } from '../store';
import { saveDiaryPost, getDiaryPostById } from '../store/diarySlice';
import { DB_ID_PREFIXES } from '../config';

export const Diary: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const { currentPost } = useAppSelector((state: RootState) => state.diary);

  const [doc, setDoc] = useState(currentPost?.body ?? '');

  const handleDocChange = useCallback((newDoc: string) => setDoc(newDoc), []);

  const handleOnBlur = useCallback((e: any) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsEditing(false);
    }
  }, []);

  const handlePreviewClick = useCallback((e: any) => {
    if (e.detail === 2) {
      setIsEditing(true);
    }
  }, []);

  const handleDocSave: <T>(data: T) => void = (data) => {
    if (data) {
      dispatch(
        saveDiaryPost({
          body: data as string,
          date: selectedDate.toJSON(),
        })
      );
    }
  };

  const counts = useMarkdownCounts(doc);
  useAutoSave(doc, 500, handleDocSave);

  useEffect(() => {
    let ignoreFtech = false;
    if (!ignoreFtech && selectedDate) {
      setDoc('');
      const id = `${DB_ID_PREFIXES.diaryPost}#${format(
        selectedDate,
        'yyyy-MM-dd'
      )}`;

      dispatch(getDiaryPostById(id))
        .unwrap()
        .then((post) => {
          setDoc(post.body);
        })
        .catch((_e) => {
          setDoc('');
        });
    }

    return () => {
      ignoreFtech = true;
    };
  }, [selectedDate]);

  // useEffect(() => {
  //   let hasSaved = false;
  //   if (!hasSaved && debouncedDoc && currentPost?.body !== debouncedDoc) {
  //     dispatch(
  //       saveDiaryPost({
  //         ...currentPost,
  //         body: debouncedDoc,
  //         date: selectedDate.toJSON(),
  //       })
  //     );
  //   }
  //
  //   return () => {
  //     hasSaved = true;
  //   };
  // }, [debouncedDoc, selectedDate, currentPost]);

  return (
    <DefaultLayout>
      <WithSidebarLayout
        sidebarTitle="Diary"
        sidebar={
          <Box padding={4}>
            <Calendar
              activeDates={[
                new Date('2022-10-12'),
                new Date('2022-10-10'),
                new Date('2022-08-21'),
              ]}
              onClickDay={setSelectedDate}
            />
          </Box>
        }
      >
        <Box height="100vh" p={5}>
          <Box>
            <Text
              m={0}
              p={4}
              bg="bg1"
              variant="blockquote"
              border="none"
              borderBottom="1px solid var(--color-bg-2)"
              borderRadius="0"
              borderTopRightRadius={4}
              borderTopLeftRadius={4}
            >
              <span>{format(selectedDate, 'EEEE, LLLL, d, Y')}</span>
              {counts.words && (
                <Text
                  display="inline-block"
                  mx={3}
                  variant="label1"
                  bg="bg2"
                  p={2}
                  borderRadius={4}
                >
                  {counts.words} words
                </Text>
              )}
            </Text>
          </Box>
          {(isEditing || !doc) && (
            <DiaryEditor
              onChange={handleDocChange}
              onBlur={handleOnBlur}
              initialDoc={doc}
            />
          )}
          {!isEditing && doc && (
            <DiaryPreview doc={doc} onClick={handlePreviewClick} />
          )}
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};
