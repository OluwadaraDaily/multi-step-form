import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import './App.scss';
import MainLayout from './layouts/MainLayout/MainLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
