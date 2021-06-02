import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GlobalState } from "./GlobalState";

import Auth from './pages/Auth'
import Home from "./pages/Home";
import Order from "./pages/Order";

const MainPages = () => {
  const state = useContext(GlobalState);
  console.log(state)
  const [isLoggedIn] = state.userAPI.isLoggedIn;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isDriver] = state.userAPI.isDriver;

  return (
    <Router>
      <div className="app px-6 md:px-14 xl:px-16 flex flex-col min-h-screen">
        {!isLoggedIn? <Route path="/" component={Auth} />:<>
          <Header />
          <main className="center flex-grow">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/order" exact component={Order} />
              <Redirect from="*" to="/"/>
            </Switch>
          </main>
          <Footer />
        </>
        }
      </div>
    </Router>
  );
};

export default MainPages;
