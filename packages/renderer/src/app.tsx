import React from 'react';

import { Pomodoro } from './pages';

// import Editor from './editor';
// import Preview from './preview';
import './app.css';

const App: React.FC = () => {
  // const [doc, setDoc] = useState<string>('# Hello, World!\n');

  // const handleDocChange = useCallback((newDoc) => {
  //   setDoc(newDoc);
  // }, []);

  return (
    <div className="app">
      {/* <Editor onChange={handleDocChange} initialDoc={doc} />
      <Preview doc={doc} /> */}
      <Pomodoro />
    </div>
  );
};

export default App;
