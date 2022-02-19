import Home from './components/Home';
import Login from './components/Login/login';

const routes = [
  {
    path: '/',
    element: <Login />,
    isPrivate: false
  },
  {
    path: '/home',
    element: <Home />,
    isPrivate: true
  },
];

export default routes;
