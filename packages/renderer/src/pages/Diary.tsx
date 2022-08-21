import * as React from 'react';
import { useState, useCallback } from 'react';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import {
  Box,
  DiaryEditor,
  DiaryPreview,
  PomodoroSettings,
  Text,
} from '../components';

export const Diary: React.FC = () => {
  const [doc, setDoc] = useState<string>(
    '# Hello World!\nLorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident.\n```bash\n npm i\n```'
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

  return (
    <DefaultLayout>
      <WithSidebarLayout
        sidebarTitle="Pomodoro Settings"
        sidebar={
          <Box padding={4}>
            <PomodoroSettings />
          </Box>
        }
      >
        <Box height="100vh" p={5}>
          <Text
            m={0}
            p={4}
            pb={0}
            bg="bg1"
            variant="blockquote"
            border="none"
            borderTopRightRadius={4}
            borderTopLeftRadius={4}
          >
            Staurday, May 14, 2022
          </Text>
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
