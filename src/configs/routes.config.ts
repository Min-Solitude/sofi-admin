import { FunctionComponent } from "react";

import screenRoutes from "../screen";

export interface Route {
  path: string;
  component: FunctionComponent<any>;
  layout: FunctionComponent<any> | null;
}

export const routes: Route[] = [...screenRoutes];
