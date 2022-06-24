import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AllMuseums from "./components/museum/MuseumActions/AllMuseums";
import AllAuditoriums from "./components/museum/AuditoriumActions/AllAuditoriums";
import AllExhibitions from "./components/museum/ExhibitionActions/AllExhibitions";
import AddExhibition from "./components/museum/ExhibitionActions/AddExhibition";
import EditExhibition from "./components/museum/ExhibitionActions/EditExhibition";
import AllExhibits from "./components/museum/ExhibitActions/AllExhibits";
import AddMuseum from "./components/museum/MuseumActions/AddMuseum";
import EditMuseum from "./components/museum/MuseumActions/EditMuseum";
import AddExhibit from "./components/museum/ExhibitActions/AddExhibit";
import EditExhibit from "./components/museum/ExhibitActions/EditExhibit";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="set-overflow-y">
        <Switch>
          <Redirect exact from="/" to="home" />
          <Route path="/home" component={HomePage} />
          <Redirect exact from="/" to="museums" />
          <Route exact path="/museums" component={AllMuseums} />
          <Redirect exact from="/" to="auditoriums" />
          <Route exact path="/auditoriums" component={AllAuditoriums} />
          <Redirect exact from="/" to="exhibitions" />
          <Route exact path="/exhibitions" component={AllExhibitions} />
          <Redirect exact from="/" to="exhibits" />
          <Route exact path="/exhibits" component={AllExhibits} />
          <Redirect exact from="/" to="addmuseum" />
          <PrivateRoute exact path="/addmuseum" component={AddMuseum} />
          <Redirect exact from="/" to="editmuseum" />
          <PrivateRoute exact path="/editmuseum/:id" component={EditMuseum} />
          <Redirect exact from="/" to="addexhibit" />
          <PrivateRoute exact path="/addexhibition" component={AddExhibition} />
          <Redirect exact from="/" to="editexhibition" />
          <PrivateRoute exact path="/editexhibition/:id" component={EditExhibition} />
          <Redirect exact from="/" to="addexhibit" />
          <PrivateRoute exact path="/addexhibit" component={AddExhibit} />
          <Redirect exact from="/" to="editexhibit" />
          <PrivateRoute exact path="/editexhibit/:id" component={EditExhibit} />
          <Redirect exact from="/" to="login" />
          <Route exact path="/login" component={Login} />
          <Redirect exact from="/" to="logout" />
          <PrivateRoute exact path="/logout" component={Logout} />
        </Switch>
        <NotificationContainer />
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
