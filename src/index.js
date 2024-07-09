import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Characters from './components/Characters/Characters';
import DetailChar from './components/Detail/DetailChar';
import Location from './components/Location/Location';
import { atom, RecoilRoot, selector } from 'recoil';
import ErrorPage from './components/ErrorPage';

const getLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    return JSON.parse(storedValue);
  }
  return defaultValue;
};

export const locationsState = atom({
  key: 'locations', 
  default: getLocalStorage('locations', []),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('locations', JSON.stringify(newValue));
      });
    },
  ],
});

export const selectedLocationState = selector({
  key: 'selectedLocationState',
  get: ({ get }) => {
    const itemList = get(locationsState);
    return (value) => itemList.find((item) => item.value === value);
  },
});


export const charactersState = atom({
  key: 'characters', 
  default: getLocalStorage('characters', []),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem('characters', JSON.stringify(newValue));
      });
    },
  ],
});

export const selectedCharacterState = selector({
  key: 'selectedCharactersState',
  get: ({ get }) => {
    const itemList = get(charactersState);
    return (id) => itemList.find((item) => Number(item.id) === Number(id));
  },
});


const router = createBrowserRouter([
  {
    path: "/",
    element: <Characters/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/characters/:id",
    element: <DetailChar/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/location",
    element: <Location/>,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RecoilRoot>
          <RouterProvider router={router} />
      </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
