import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/auth/signin',
    element: lazy(() => import('./views/auth/signin/SignIn'))
  },
  {
    exact: 'true',
    path: '/auth/signup',
    element: lazy(() => import('./views/auth/signup/SignUp'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/auth/profile',
        element: lazy(() => import('./views/auth/signin/Profile'))
      },
      {
        exact: 'true',
        path: '/board/list',
        element: lazy(() => import('./views/board/list'))
      },
      {
            exact: 'true',
            path: '/board/view',
            element: lazy(() => import('./views/board/view'))
      },
      {
        exact: 'true',
        path: '/board/write',
        element: lazy(() => import('./views/board/write'))
      },
      {
        exact: 'true',
        path: '/board/edit',
        element: lazy(() => import('./views/board/edit'))
      },
      {
        exact: 'true',
        path: '/exam/list',
        element: lazy(() => import('./views/exam/list'))
      },
      {
        exact: 'true',
        path: '/exam/view',
        element: lazy(() => import('./views/exam/view'))
      },
      {
        exact: 'true',
        path: '/locker/list',
        element: lazy(() => import('./views/locker/list'))
      },
      {
        exact: 'true',
        path: '/locker/view',
        element: lazy(() => import('./views/locker/view'))
      },
      {
        exact: 'true',
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb-paging',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
