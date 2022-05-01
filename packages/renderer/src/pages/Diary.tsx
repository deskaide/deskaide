import React, { useState, useCallback } from 'react';

import { DefaultLayout, WithSidebarLayout } from '../layouts';
import {
  Box,
  DiaryEditor,
  DiaryPreview,
  PomodoroSettings,
} from '../components';

const Diary: React.FC = () => {
  const [doc, setDoc] = useState<string>('# Hello World!\n');
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const handleDocChange = useCallback((newDoc) => setDoc(newDoc), []);
  const handleOnBlur = useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsEditing(false);
    }
  }, []);
  const handlePreviewClick = useCallback((e) => {
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
        {isEditing && (
          <DiaryEditor
            onChange={handleDocChange}
            onBlur={handleOnBlur}
            initialDoc={doc}
          />
        )}
        {!isEditing && <DiaryPreview doc={doc} onClick={handlePreviewClick} />}
      </WithSidebarLayout>
    </DefaultLayout>
  );
};

export default Diary;
