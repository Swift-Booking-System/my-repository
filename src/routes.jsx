import { lazy } from 'react';

const Card = lazy(() => import('./Card'));

const routes = [
  {
    path: '/card/:id',
    element: <Card />,
  },
];

export default routes;