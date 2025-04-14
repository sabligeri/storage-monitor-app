import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import App from './App';
import PrivateRoute from './components/PrivateRoute';
import StorageList from './components/storagelist/StorageList';
import Storage from './components/storage/Storage';
import Prodct from './components/product/Product';
import ProductionSimulator from './components/production/ProductionSimulator';
import { ThemeProvider } from './context/ThemeContext';

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
        path: 'storagelist',
        element: <StorageList />,
      },
      {
        path: 'storage/:storageId',
        element: <Storage />
      },
      {
        path: 'products',
        element: <Prodct />
      },
      {
        path: 'production',
        element: <ProductionSimulator />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
