import { Fragment, Suspense } from "react";
import {
  Route,
  Routes,
  unstable_HistoryRouter as ConnectedRouter,
} from "react-router-dom";
import { routes } from "./configs";
import history from "./redux/store/history";

function App() {
  return (
    <div className="App overflow-x-hidden">
      <Suspense fallback={"Loading..."}>
        <ConnectedRouter history={history as any}>
          <Routes>
            {routes.map((route) => {
              const Page = route.component;
              const Layout = route.layout || Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </ConnectedRouter>
      </Suspense>
    </div>
  );
}

export default App;
