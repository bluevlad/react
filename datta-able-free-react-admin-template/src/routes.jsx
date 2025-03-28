import React, { Suspense, Fragment, lazy, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import AdminLayout from "./layouts/AdminLayout";
import { BASE_URL } from "./config/constant";
import { fetchRouterData } from "./data/routers"; // API 호출

const Routers = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const loadRoutes = async () => {
      const data = await fetchRouterData();
      setRoutes(data);
    };
    loadRoutes();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route, i) => {
          const Element = lazy(() => import(`${route.elementPath}`));
          const Layout = route.layout === "AdminLayout" ? AdminLayout : Fragment;

          return (
            <Route
              key={i}
              path={route.path}
              element={
                <Layout>
                  <Element />
                </Layout>
              }
            />
          );
        })}

        {/* 기본 페이지 리디렉션 */}
        <Route path="*" element={<Navigate to={BASE_URL} />} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
