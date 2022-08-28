import React, { useState } from "react";
import Header from "./Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";

import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetails from "../../features/catalog/ProductDetails";

export default function App() {
  const [mode, setMode] = useState(true);
  const displayMode = mode ? "light" : "dark";

  const darkTheme = createTheme({
    palette: {
      mode: displayMode,
    },
  });

  const handleMode = () => setMode(!mode);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header handleMode={handleMode} />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<ProductDetails />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}
