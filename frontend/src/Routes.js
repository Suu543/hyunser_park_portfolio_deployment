import React from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./components/auth/Signup";
import AccountActivation from "./components/auth/AccountActivation";
import Signin from "./components/auth/Signin";
import RestrictRoute from "./auth/RestrictRoute";

import Portfolio from "./core/Portfolio";

import CreateCategory from "./components/category/CreateCategory";

import CreateWork from "./components/work/CreateWork";
import ReadWorks from "./components/work/ReadWorks";
import ReadWorksByCategory from "./components/work/ReadWorksByCategory";
import ReadSingleWork from "./components/work/ReadSingleWork";

import CreateImage from "./components/image/CreateImage";
import ReadImages from "./components/image/ReadImages";
import UpdateImage from "./components/image/UpdateImage";

import ReadCategory from "./components/category/ReadCategory";
import UpdateCategory from "./components/category/UpdateCategory";

import CreateGridImage from "./components/grid/CreateGridImage";
import ReadGridImages from "./components/grid/ReadGridImages";
import UpdateGridImage from "./components/grid/UpdateGridImage";

import AdminDashboard from "./components/admin/AdminDashboard";

import ContactPage from "./components/contact/ContactPage";

const GlobalStyle = createGlobalStyle`
    * {
      padding: 0;
      margin: 0;
      font-size: 62.5%;
      font-family: serif;
      box-sizing: border-box;
    }
  `;

const Routes = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signup" component={Signup} exact />
          <Route
            path="/auth/activate/:token"
            component={AccountActivation}
            exact
          />
          <Route path="/login" component={Signin} exact />
          <Route path="/portfolio" component={Portfolio} exact />
          <Route path="/contact" component={ContactPage} exact />
          <Route
            path="/works/:category"
            component={ReadWorksByCategory}
            exact
          />
          <Route
            path="/works/:category/:slug"
            component={ReadSingleWork}
            exact
          />

          <RestrictRoute
            path="/admin/features"
            component={AdminDashboard}
            fallback={Home}
            exact
          />
          <RestrictRoute
            path="/admin/category"
            component={ReadCategory}
            fallback={Home}
            exact
          />
          <RestrictRoute
            path="/admin/category/create"
            component={CreateCategory}
            fallback={Home}
            exact
          />
          <RestrictRoute
            path="/admin/category/update/:slug"
            component={UpdateCategory}
            fallback={Home}
            exact
          />
          <RestrictRoute
            path="/admin/carousel"
            component={ReadImages}
            fallback={Home}
            exact
          />
          <RestrictRoute
            path="/admin/carousel/create"
            component={CreateImage}
            fallback={Home}
            exact
          />
          <RestrictRoute
            path="/admin/carousel/update/:id"
            component={UpdateImage}
            fallback={Home}
            exact
          />
          <RestrictRoute
            path="/admin/work"
            component={ReadWorks}
            fallback={Home}
            exact
          />
          <RestrictRoute
            path="/admin/work/create"
            component={CreateWork}
            fallback={Home}
            exact
          />

          <RestrictRoute
            path="/admin/grid"
            component={ReadGridImages}
            fallback={Home}
            exact
          />
          <RestrictRoute
            path="/admin/grid/create"
            component={CreateGridImage}
            fallback={Home}
            exact
          />
          <RestrictRoute
            path="/admin/grid/update/:id"
            component={UpdateGridImage}
            fallback={Home}
            exact
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default Routes;
