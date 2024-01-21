import { useState } from "react";
import reactLogo from "./react.svg";
import viteLogo from "./vite.svg";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
