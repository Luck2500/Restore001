import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import { Route, Routes } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ProductDetails from "../../features/catalog/ProductDetails";
import NotFound from "../errors/NotFound";
import { ToastContainer } from "react-toastify";
import ServerError from "../errors/ServerError";
import LoadingComponent from "./LoadingComponent";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch, useAppSelector } from "../store/configureStor";
import { fetchBasketAsync, setBasket } from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { PrivateLogin, PrivateRoute } from "./PrivateRoute";

export default function App() {
  //const { setBasket } = useStoreContext(); //ควบคุมสเตทด้วย React context to Centralize
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const { fullscreen } = useAppSelector((state) => state.screen);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const [mode, setMode] = useState(true);
  const displayMode = mode ? "light" : "dark";

  const darkTheme = createTheme({
    palette: {
      mode: displayMode,
    },
  });

  const handleMode = () => setMode(!mode);

  if (loading) return <LoadingComponent message="Initilize App....." />;

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ToastContainer
          position="bottom-right"
          theme="colored"
          autoClose={600}
        />

        <CssBaseline />
        <Header handleMode={handleMode} />
        {fullscreen ? (
          <Container sx={{ marginTop: 2 }}>{mainroute}</Container>
        ) : (
          <>{mainroute}</>
        )}
      </ThemeProvider>
    </>
  );
}

const mainroute = (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="/catalog" element={<Catalog />} />
    <Route path="/basket" element={<BasketPage />} />
    <Route path="/catalog/:id" element={<ProductDetails />} />
    <Route path="/register" element={<Register />} />
    <Route path="/server-error" element={<ServerError />} />
    <Route path="*" element={<NotFound />} />
    <Route
      path="/login"
      element={
        <PrivateLogin>
          <Login />
        </PrivateLogin>
      }
    />
    <Route element={<PrivateRoute />}>
      <Route path="/checkout" element={<CheckoutPage />} />
    </Route>
  </Routes>
);
