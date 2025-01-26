// import { useState } from "react";
import { useEffect ,useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import LayoutWrapper from "@/components/layouts/LayoutWrapper";
import HomePage from "./Pages/HomePage";
import TextSharePage from "./Pages/TextSharePage";
import SuccessPage from "./Pages/SuccessPage";
import NotFound from "./components/layouts/NotFound";

function App() {
  const [validPath, setValidPath] = useState(true);

  useEffect(() => {
    // Check if the current pathname does not match the base URL '/TextShare-ui'
    if (!window.location.pathname.startsWith("/TextShare")) {
      setValidPath(false); // Set invalid path flag
    }
  }, []);

  if (!validPath) {
    // Redirect the user to the correct base URL if they visit an incorrect URL
    window.location.replace("/TextShare");
    return null;  // Avoid rendering anything until the redirect happens
  }
  return (
    <BrowserRouter basename="/TextShare">
      <Routes>
        <Route element={<LayoutWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/createTextShare" element={<TextSharePage />} />
          <Route path="/textShare/:id" element={<TextSharePage />} />
          <Route path="/textShare/success/:id" element={<SuccessPage />} />
          {/* Fallback route for undefined paths */}
        </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
