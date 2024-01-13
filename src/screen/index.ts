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
  {
    path: "/system",
    component: React.lazy(() => import("./System")),
    layout: MainLayout,
  },
  {
    path: "/story",
    component: React.lazy(() => import("./Story")),
    layout: MainLayout,
  },
  {
    path: "/altar",
    component: React.lazy(() => import("./Altar")),
    layout: MainLayout,
  },
];

export default routes;
