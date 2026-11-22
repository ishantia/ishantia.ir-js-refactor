import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AmbientBackground from "./components/AmbientBackground.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";
import { useScrollEffects } from "./hooks/useScrollEffects.js";
import HomePage from "./pages/HomePage.jsx";

// Code-split Resume so initial bundle for HomePage stays minimal
const Resume = lazy(() => import("./pages/Resume.jsx"));

function PageLoading() {
  return (
    <div className="page-loader" role="status" aria-label="Loading page">
      <div className="loader-ring"></div>
    </div>
  );
}

export default function App() {
  const { showBackToTop } = useScrollEffects();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <AmbientBackground />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/resume"
            element={
              <Suspense fallback={<PageLoading />}>
                <Resume />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer />
      <BackToTop visible={showBackToTop} />
    </>
  );
}
