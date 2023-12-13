import React from "react";
import MainLayout from "../layouts";
import { Route } from "../configs";

const routes: Route[] = [
  {
    path: "/",
    component: React.lazy(() => import("./Home")),
    layout: MainLayout,
  },
  {
    path: "/login",
    component: React.lazy(() => import("./Login")),
    layout: null,
  },
  {
    path: "/dashboard",
    component: React.lazy(() => import("./Dashboard")),
    layout: MainLayout,
  },
];

export default routes;
