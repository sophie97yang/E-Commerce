import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignUpFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LandingPage from "./components/LandingPage/Landing";
import Order from "./components/Orders";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ProductDetails from "./components/ProductDetails";
import ProductAll from "./components/ProductAll";
import CreateProductForm from "./components/CreateProductFormPage"
import CreateReviewForm from "./components/ProductReviewFormPage"
import AccountPage from "./components/AccountPage";
import PastOrders from "./components/PastOrders";
import UpdateReviewForm from "./components/UpdateReviewFormPage";
import UpdateProductForm from './components/UpdateProductFormPage'
import ErrorPage from "./components/ErrorPage";

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
          <Route  path='/orders/past'>
            <PastOrders />
          </Route>
          <Route path="/orders">
            <Order isLoaded={isLoaded}/>
          </Route>
          <Route path="/products/new">
            <CreateProductForm />
          </Route>
          <Route exact path="/products/:id/edit">
            <UpdateProductForm />
          </Route>
          <Route exact path="/products/:id/reviews/new">
            <CreateReviewForm />
          </Route>

          <Route exact path="/products/:id">
            <ProductDetails />
          </Route>

          <Route path="/products">
            <ProductAll />
          </Route>

          <Route path="/account">
            <AccountPage />
          </Route>

          <Route path="/products/:product_id/reviews/:id/edit">
            <UpdateReviewForm />
          </Route>

          <Route path='404'>
            <h2>Page Not Found</h2>
          </Route>

          <Route path='*'>
            <ErrorPage/>
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
