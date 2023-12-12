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
import OrderComplete from "./components/OrderComplete";
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AboutUs from "./components/AboutUs";
import CustomerReviews from "./components/CustomerReviews";
import { getAllProducts } from "./store/products";
import SearchResults from "./components/ProductAll/SearchResults";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />

      <div className="main-content">
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

          <Route path="/aboutus">
            <AboutUs />
          </Route>

          <Route path="/customersreviews">
            <CustomerReviews />
          </Route>

          <ProtectedRoute path='/orders/:orderId/complete'>
            <OrderComplete />
          </ProtectedRoute>
          <ProtectedRoute  path='/orders/past'>
            <PastOrders />
          </ProtectedRoute>

          <ProtectedRoute path="/orders">
            <Order isLoaded={isLoaded}/>
          </ProtectedRoute>

          <Route path='/search/:category&:search'>
            <SearchResults />
          </Route>

          <ProtectedRoute path="/products/new">
            <CreateProductForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/products/:id/edit">
            <UpdateProductForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/products/:id/reviews/new">
            <CreateReviewForm />
          </ProtectedRoute>

          <Route exact path="/products/:id">
            <ProductDetails />
          </Route>

          <Route exact path="/products">
            <ProductAll />
          </Route>

          <ProtectedRoute exact path="/account">
            <AccountPage />
          </ProtectedRoute>

          <ProtectedRoute path="/products/:product_id/reviews/:id/edit">
            <UpdateReviewForm />
          </ProtectedRoute>

          <Route path='*'>
            <ErrorPage/>
          </Route>

        </Switch>
      )}
      </div>
      <Footer />
    </>
  );
}

export default App;
