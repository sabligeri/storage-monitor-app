import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import NavBar from './components/navbar/NavBar';
import StorageList from './components/storagelist/StorageList';
import Storage from './components/storage/Storage';
import Product from './components/product/Product';
import ProductionSimulator from './components/production/ProductionSimulator';

function App() {

  const location = useLocation();

  const hideHeaderLocations = ['/login', '/register'];

  return (
    <>
      {!hideHeaderLocations.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate replace to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/storagelist"
          element={
            <PrivateRoute>
              <StorageList />
            </PrivateRoute>
          }
        />
        <Route
          path="/storage/:storageId"
          element={
            <PrivateRoute>
              <Storage />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/production"
          element={
            <PrivateRoute>
              <ProductionSimulator />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
