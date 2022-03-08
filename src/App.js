import React, { useState, useEffect } from 'react';
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
  const [productList, setProductList] = useState([]);
  useEffect(() => {
const fetchProductList = async () => {
try {
const params = { _page: 1, _limit: 10 };
const response = await productApi.getAll(params);
console.log('Fetch products successfully: ', response);
setProductList(response.data);
} catch (error) {
console.log('Failed to fetch product list: ', error);
}
}
fetchProductList();
}, []);
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
//           <ProductList productList={productList} />;
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
