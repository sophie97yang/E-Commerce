import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LandingPage from "./components/LandingPage";
import Order from "./components/Orders";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProductDetails from "./components/ProductDetails";
import ProductAll from "./components/ProductAll";
import CreateProductForm from "./components/CreateProductFormPage"
import CreateReviewForm from "./components/ProductReviewFormPage"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
          <LandingPage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/orders">
            <Order />
          </Route>
          <Route path="/products/new">
            <CreateProductForm />
          </Route>

          <Route path="/products/:id/reviews/new">
            <CreateReviewForm />
          </Route>

          <Route path="/products/:id">
            <ProductDetails />
          </Route>




          <Route path="/products">
            <ProductAll />
          </Route>




        </Switch>
      )}
    </>
  );
}

export default App;
