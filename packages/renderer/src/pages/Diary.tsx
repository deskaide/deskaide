import * as React from 'react';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { format } from 'date-fns';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, MarkdownPreview, Calendar, Text, Editor } from '../components';
import { useAutoSave, useMarkdownCounts } from '../hooks';
import { useAppDispatch, useAppSelector } from '../hooks';
import type { RootState } from '../store';
import {
  getAllDiaryPosts,
  getDiaryPostById,
  saveDiaryPost,
  setSelectedDate,
  setSelectedMonth,
} from '../store/diarySlice';
import { DB_ID_PREFIXES } from '../config';

export const Diary: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const [doc, setDoc] = useState('');
  const [isDocLoaded, setIsDocLoaded] = useState(false);
  const dispatch = useAppDispatch();

  const { allDiaryPosts, selectedDate, selectedMonth } = useAppSelector(
    (state: RootState) => state.diary
  );

  const postId = useMemo(() => {
    return `${DB_ID_PREFIXES.diaryPost}#${format(
      new Date(selectedDate),
      'yyyy-MM-dd'
    )}`;
  }, [selectedDate]);

  useEffect(() => {
    let ignoreFtech = false;
    if (!ignoreFtech && postId) {
      setIsDocLoaded(false);
      setIsEditing(false);
      setDoc('');

      dispatch(getDiaryPostById(postId))
        .unwrap()
        .then((post) => {
          setIsDocLoaded(true);
          setDoc(post.body);
        })
        .catch((_e) => {
          setIsDocLoaded(true);
          setDoc('');
        });
    }

    return () => {
      ignoreFtech = true;
    };
  }, [postId]);

  const handleDocChange = useCallback((newDoc: string) => setDoc(newDoc), []);

  const handleOnBlur: React.FocusEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setIsEditing(false);
      }
    },
    []
  );

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === 'Escape') {
        setIsEditing(false);
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  });

  const handlePreviewClick: React.MouseEventHandler<HTMLDivElement> =
    useCallback((e) => {
      if (e.detail === 2) {
        setIsEditing(true);
      }
    }, []);

  const handleDocSave: <T>(data: T) => void = (data) => {
    if (isDocLoaded && isEditing) {
      dispatch(
        saveDiaryPost({
          body: data as string,
          date: selectedDate,
        })
      );
    }
  };

  const counts = useMarkdownCounts(doc);
  useAutoSave(doc, 500, handleDocSave);

  const month = React.useMemo(() => {
    return format(new Date(selectedMonth), 'yyyy-MM');
  }, [selectedMonth]);

  useEffect(() => {
    dispatch(getAllDiaryPosts(month));
  }, [selectedMonth]);

  const activeDates = React.useMemo(() => {
    return allDiaryPosts.items.length > 0
      ? allDiaryPosts.items
          .filter((post) => post.body)
          .map((post) => new Date(post.date))
      : [];
  }, [allDiaryPosts]);

  return (
    <DefaultLayout>
      <WithSidebarLayout
        sidebarTitle="Diary"
        sidebar={
          <Box padding={4}>
            <Calendar
              activeDates={activeDates}
              onClickDay={(date) => dispatch(setSelectedDate(date.toJSON()))}
              onClickMonth={(date) => dispatch(setSelectedMonth(date.toJSON()))}
              defaultSelectedDate={new Date(selectedDate)}
            />
          </Box>
        }
      >
        <Box height="100vh" p={5}>
          <Box
            height="calc(100vh - 128px)"
            overflow="hidden"
            borderBottom="2px solid var(--color-bg-1)"
          >
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
              <span>{format(new Date(selectedDate), 'EEEE, LLLL, d, Y')}</span>
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

            <Box height="100%">
              {isEditing && (
                <Editor
                  onChange={handleDocChange}
                  onBlur={handleOnBlur}
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
