import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { format } from 'date-fns';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, DiaryEditor, DiaryPreview, Calendar, Text } from '../components';
import { useDebounce, useMarkdownCounts } from '../hooks';
import { useAppDispatch, useAppSelector } from '../hooks';
import type { RootState } from '../store';
import { saveDiaryPost, getDiaryPostById } from '../store/diarySlice';
import { DB_ID_PREFIXES } from '../config';

export const Diary: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const { currentPost, currentPostState } = useAppSelector(
    (state: RootState) => state.diary
  );

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

  const debouncedDoc = useDebounce(doc, 500);
  const counts = useMarkdownCounts(debouncedDoc);

  useEffect(() => {
    let ignoreFtech = false;
    if (!ignoreFtech && selectedDate) {
      const id = `${DB_ID_PREFIXES.diaryPost}#${format(
        selectedDate,
        'yyyy-MM-dd'
      )}`;
      console.log(id);

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

  useEffect(() => {
    let hasSaved = false;
    if (!hasSaved && debouncedDoc && currentPost?.body !== debouncedDoc) {
      console.log('-------CP');
      console.log(currentPost);

      dispatch(
        saveDiaryPost({
          ...currentPost,
          body: debouncedDoc,
          date: selectedDate,
        })
      );
      console.log(currentPost);
      console.log(currentPostState);
    }

    return () => {
      hasSaved = true;
    };
  }, [debouncedDoc, selectedDate, currentPost]);

  return (
    <DefaultLayout>
      <WithSidebarLayout
        sidebarTitle="Diary"
        sidebar={
          <Box padding={4}>
            <Calendar
              activeDates={[
                new Date('2022-07-12'),
                new Date('2022-08-10'),
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
          {isEditing && (
            <DiaryEditor
              onChange={handleDocChange}
              onBlur={handleOnBlur}
              initialDoc={doc}
            />
          )}
          {!isEditing && (
            <DiaryPreview doc={doc} onClick={handlePreviewClick} />
          )}
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};
