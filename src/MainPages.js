import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GlobalState } from "./GlobalState";
import axios from "./axios";
import { useToasts } from "react-toast-notifications";

// Pages

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Order from "./pages/Order";

// Admin
import Categories from  './pages/AddCategory'

// Utils
import NotFound from './components/utils/NotFound'
// import Loading from './components/utils/Loading'

const MainPages = () => {
  const state = useContext(GlobalState);
  const { addToast } = useToasts();
  console.log(state);
  const [isLoggedIn] = state.userAPI.isLoggedIn;
  const [isAdmin] = state.userAPI.isAdmin;
  // const [isDriver] = state.userAPI.isDriver;

  useEffect(() => {
    const ping = () => {
      axios.get("/ping").catch((err) => {
        console.log("hello");
        addToast(
          "Unable to connect to the server at the moment. Contact developer for assistance or try again later.",
          {
            appearance: "error",
          }
        );
      });
    };
    ping();
  }, [addToast]);

  return (
    <Router>
      <div className="app px-6 md:px-14 xl:px-16 flex flex-col min-h-screen">
        {!isLoggedIn ? (
          <Route path="/" component={Auth} />
        ) : (
          <>
            <Header />
            <main className="center flex-grow">
              <Switch>
                {/* Common paths */}
                <Route path="/" exact component={Home} />
                <Route path="/order" exact component={Order} />

                {/* Admin paths */}
                <Route to="/categories" component={isAdmin ? Categories : NotFound} />
                <Redirect from="*" to="/" />
              </Switch>
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
};

export default MainPages;
