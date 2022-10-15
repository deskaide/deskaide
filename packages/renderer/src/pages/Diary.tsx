import * as React from 'react';
import { useState, useCallback, useEffect } from 'react';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, DiaryEditor, DiaryPreview, Calendar, Text } from '../components';
import { useDebounce, useMarkdownCounts } from '../hooks';

export const Diary: React.FC = () => {
  const [doc, setDoc] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(true);

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
    let hasSaved = false;
    if (!hasSaved) {
      console.log(debouncedDoc);
    }

    return () => {
      hasSaved = true;
    };
  }, [debouncedDoc]);

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
              <span>Staurday, May 14, 2022</span>
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
