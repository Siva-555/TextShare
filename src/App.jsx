// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import LayoutWrapper from "@/components/layouts/LayoutWrapper";
import HomePage from "./Pages/HomePage";
import TextSharePage from "./Pages/TextSharePage";
import SuccessPage from "./Pages/SuccessPage";

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/createTextShare" element={<TextSharePage />} />
          <Route path="/textShare/:id" element={<TextSharePage />} />
          <Route path="/textShare/success/:id" element={<SuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
