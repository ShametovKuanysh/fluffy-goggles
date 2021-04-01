import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentCompany, logoutCompany } from "./actions/authActions";
import { clearCurrentCompanyProfile } from "./actions/companyProfileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateCompanyProfile from "./components/create-companyprofile/CreateCompanyProfile";
import EditCompanyProfile from "./components/edit-companyprofile/EditCompanyProfile";
import CompanyProfiles from "./components/companyprofiles/CompanyProfiles";
import CompanyProfile from "./components/companyprofile/CompanyProfile";
import NotFound from "./components/not-found/NotFound";
import Institutions from "./components/institutions/Institutions";
import Institution from "./components/institution/Institution";
import Meal from "./components/meal/Meal";
import Meals from "./components/meal/Meals";
import Room from "./components/room/Room";
import Rooms from "./components/room/Rooms";
import Film from "./components/film/Film";
import Films from "./components/film/Films";
import Session from "./components/session/Session";
import Sessions from "./components/session/Sessions";
import Seat from "./components/seat/Seat";
import Seats from "./components/seat/Seats";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuth
  store.dispatch(setCurrentCompany(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutCompany());
    // TODO  clear current profile
    store.dispatch(clearCurrentCompanyProfile());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/companyprofiles"
                component={CompanyProfiles}
              />
              <Route
                exact
                path="/companyprofile/:handle"
                component={CompanyProfile}
              />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-companyprofile"
                  component={CreateCompanyProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-companyprofile"
                  component={EditCompanyProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Institutions} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/meals/all/:id" component={Meals} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/rooms/all/:id" component={Rooms} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/seats/all/:id" component={Seats} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/sessions/all/:id"
                  component={Sessions}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/films/all/:id" component={Films} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/institution/:id"
                  component={Institution}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/meals/:id" component={Meal} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/rooms/:id" component={Room} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/films/:id" component={Film} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/sessions/:id" component={Session} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/seats/:id" component={Seat} />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
