import React from "react";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import Electronics from "./components/electronics";
import Home from "./components/home";
import HealthFitness from "./components/healthFitness";
import Travel from "./components/travel";
import HomePage from "./components/homePage";
import Footer from "./components/footer";
import NotFound from "./components/notFound";
import styled from "styled-components";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={props => <HomePage {...props} />} />
            <Route
              path="/electronics"
              render={props => <Electronics {...props} />}
            />
            <Route path="/home" render={props => <Home {...props} />} />
            <Route
              path="/health-fitness"
              render={props => <HealthFitness {...props} />}
            />
            <Route path="/travel" render={props => <Travel {...props} />} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default App;

const Container = styled.main``;
