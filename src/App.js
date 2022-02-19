import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';
import { AuthProvider, useAuthState } from './context/AuthContext';

const AppRoutes = ({path, isPrivate, element, ...rest }) => {
  const userDetails = useAuthState();
  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !Boolean(userDetails.token) ? (
          <Navigate to={'/login'} />
        ) : (
          {element}
        )
      }
      {...rest}
    />
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <AppRoutes
              key={route.path}
              path={route.path}
              element={route.element}
              isPrivate={route.isPrivate}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
