import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Loader.css";
import { ThemeProvider } from "./components/ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimatedName from "./components/AnimatedName";
import About from "./pages/About";
import { Fun } from "./pages/Fun";
import Work from "./pages/Work";

const IndexPage = React.lazy(() => import("./pages/IndexPage"));

const Loader = () => {
  return <span className="loader"></span>;
};

export const Fallback = () => (
  <div className="flex-1 bg-white flex justify-center items-center min-h-[70vh] h-[100%]w-[100%]">
    <Loader />
  </div>
);
export const LazyRoute = ({ Component }) => (
  // <ProtectedRoute>
  <React.Suspense fallback={<Fallback />}>
    <Component />
  </React.Suspense>
  // </ProtectedRoute>
);

export const NonProtectedLazyRoute = ({ Component }) => (
  // <React.Suspense fallback={<Fallback />}>
  <Component />
  // </React.Suspense>
);

// components/RedirectIfAuthenticated.js

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <div className="main  max-w-[1600px] px-6 md:px-[50px] m-auto">
          <Routes>
            <Route
              path="/"
              element={<NonProtectedLazyRoute Component={IndexPage} />}
            />
            <Route
              path="/about"
              element={<NonProtectedLazyRoute Component={About} />}
            />
            <Route
              path="/fun"
              element={<NonProtectedLazyRoute Component={Fun} />}
            />
            <Route
              path="/work/:id"
              element={<NonProtectedLazyRoute Component={Work} />}
            />
             
          </Routes>
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
