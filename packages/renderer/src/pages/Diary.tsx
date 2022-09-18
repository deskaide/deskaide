import * as React from 'react';
import { useState, useCallback } from 'react';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import { Box, DiaryEditor, DiaryPreview, Calendar, Text } from '../components';
import { useMarkdownCounts } from '../hooks';

export const Diary: React.FC = () => {
  const [doc, setDoc] = useState<string>(
    '# Hello World!\nLorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident.\n\n```js\n console.log("Hello World!");\n```\n\nReprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident.\n\nNisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident.\n\n```js\n console.log("Welcome to Deskaide app :)");\n```\n'
  );
  const [isEditing, setIsEditing] = useState<boolean>(true);

  const handleDocChange = useCallback((newDoc: any) => setDoc(newDoc), []);

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

  const counts = useMarkdownCounts(doc);

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
              Staurday, May 14, 2022
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
          {/* {!isEditing && (
            <DiaryEditor onChange={handleDocChange} onBlur={handleOnBlur} initialDoc={doc} />
          )} */}
        </Box>
      </WithSidebarLayout>
    </DefaultLayout>
  );
};
