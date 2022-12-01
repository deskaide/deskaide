import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { format } from 'date-fns';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, DiaryEditor, DiaryPreview, Calendar, Text } from '../components';
import { useAutoSave, useMarkdownCounts } from '../hooks';
import { useAppDispatch, useAppSelector } from '../hooks';
import type { RootState } from '../store';
import {
  saveDiaryPost,
  getDiaryPostById,
  getAllDiaryPosts,
} from '../store/diarySlice';
import { DB_ID_PREFIXES } from '../config';

export const Diary: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const { allDiaryPosts } = useAppSelector((state: RootState) => state.diary);

  const [doc, setDoc] = useState('');

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

  const postId = React.useMemo(() => {
    return `${DB_ID_PREFIXES.diaryPost}#${format(selectedDate, 'yyyy-MM-dd')}`;
  }, [selectedDate]);

  useEffect(() => {
    let ignoreFtech = false;
    if (!ignoreFtech && postId) {
      setDoc('');
      console.log('hello', postId);

      dispatch(getDiaryPostById(postId))
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
  }, [postId]);

  const selectedMonth = React.useMemo(() => {
    return format(currentMonth, 'yyyy-MM');
  }, [currentMonth]);

  useEffect(() => {
    setDoc('');
    setSelectedDate(new Date(`${selectedMonth}-01`));

    dispatch(getAllDiaryPosts(selectedMonth));
  }, [selectedMonth]);

  const activeDates = React.useMemo(() => {
    return allDiaryPosts.totalCount > 0
      ? allDiaryPosts.data.map((post) => new Date(post.doc.date))
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
              onClickDay={setSelectedDate}
              onClickMonth={setCurrentMonth}
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
