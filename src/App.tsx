import "./scss/app.scss";    
import React from "react"; 
import { Routes, Route } from "react-router-dom";
  
import Home from "./pages/Home";
import Loading from "./components/Loading";
import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(
  () => import(/*webpackChunkName: "Cart"*/ "./pages/Cart")
);
const NotFound = React.lazy(
  () => import(/*webpackChunkName: "NotFound"*/ "./pages/NotFound")
);
const FullPizza = React.lazy(
  () => import(/*webpackChunkName: "FullPizza"*/ "./pages/FullPizza")
); 
 
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<Loading />}>
              <Cart /> 
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<Loading />}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<Loading />}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
