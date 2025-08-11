/* react */
import { BrowserRouter, Route, Routes } from 'react-router';
/* pages */
import { HomePage } from './pages';

export default function RootRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
