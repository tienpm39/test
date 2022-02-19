import React, { createContext, useContext, useReducer } from 'react';

//khoi tao context
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

//actions
const BASE_URL = 'https://6164054db55edc00175c1cc9.mockapi.io/v1/auth/1';

export async function loginUser(dispatch, payload) {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let res = await fetch(`${BASE_URL}/login`, options);
    let data = await res.json();

    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data));
      return data;
    }

    dispatch({ type: 'LOGIN_ERROR', error: data.error[0] });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
}

//tao custom hooks de doc gia tri tu context
export function useAuthState() {
  const authContext = useContext(AuthStateContext);
  if (authContext === undefined) {
    throw new Error('useAuthState must use in AuthProvider');
  }
  return authContext;
}

export function useAuthDispatch() {
  const dispatchContext = useContext(AuthDispatchContext);
  if (dispatchContext === undefined) {
    throw new Error('useAuthDispatch must use in AuthProvider');
  }
}

//store to localstorage
let user = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).user
  : '';
let token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).auth_token
  : '';

//init data
export const initialState = {
  userDetail: '' | user,
  token: '' | token,
  loading: false,
  errorMessage: null,
};

//create reducer
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'LOADING_SUCCESS':
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false,
      };
    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: '',
        token: '',
      };
    default:
      throw new Error(`could not handle axtion type: ${action.type}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
