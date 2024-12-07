// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import App from './App'; // Az App komponens tartalmazza a beágyazott útvonalakat
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute komponens
import StorageList from './components/storage/StorageList';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'storage',
        element: <StorageList />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
