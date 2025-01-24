import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import AppLayout from '../components/Layout/AppLayout';
import Home from '../pages/Home';
import TimeDivination from '../components/Divination/TimeDivination';
import ThreeNumberDivination from '../components/Divination/ThreeNumberDivination';
import CustomDivination from '../components/Divination/CustomDivination';
import DivinationHistory from '../pages/DivinationHistory';
import { ErrorElement } from '../components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'divination',
        children: [
          {
            path: 'time',
            element: <TimeDivination />,
          },
          {
            path: 'three-number',
            element: <ThreeNumberDivination />,
          },
          {
            path: 'custom',
            element: <CustomDivination />,
          },
          {
            path: 'history',
            element: <DivinationHistory />,
          }
        ]
      }
    ],
  }
]); 