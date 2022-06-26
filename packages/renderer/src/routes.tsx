import { Route, Routes } from 'react-router-dom';
import {
  Diary,
  Home,
  Links,
  Notes,
  Pomodoro,
  Settings,
  Todos,
  Break,
} from './pages';

const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/diary" element={<Diary />} />
    <Route path="/links" element={<Links />} />
    <Route path="/notes" element={<Notes />} />
    <Route path="/pomodoro" element={<Pomodoro />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/todos" element={<Todos />} />
    <Route path="/break" element={<Break />} />
  </Routes>
);

export default AppRoutes;
