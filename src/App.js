import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import {Render, Content} from "./components/CommonStyles";
import { routes } from "./routes";

import "./App.css";
import Breadcrumb from "./components/Breadcrumb";

function App() {
  return (
    <Provider store={store}>
      <Render>
        <Router>
          <Breadcrumb />
          <Content>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </Content>
        </Router>
      </Render>
    </Provider>
  );
}

export default App;
