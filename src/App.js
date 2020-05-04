import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./components/header";
import About from "./components/about";
import ContactUs from "./components/contactUs";
import HomePage from "./components/homePage";
import SubLinkPage from "./components/subLinkPage";
import Footer from "./components/footer";
import NotFound from "./components/notFound";
import styled from "styled-components";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <ToastContainer />
      <main>
        <Header />
        <Container>
          <Switch>
            <Route path="/" exact render={props => <HomePage {...props} />} />
            <Route exact path="/about" render={props => <About {...props} />} />
            <Route
              exact
              path="/contact"
              render={props => <ContactUs {...props} />}
            />
            <Route
              path="/electronics/:sublink?"
              render={props => <SubLinkPage {...props} />}
            />
            <Route
              path="/home/:sublink?"
              render={props => <SubLinkPage {...props} />}
            />
            <Route
              path="/health-fitness/:sublink?"
              render={props => <SubLinkPage {...props} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </Container>
        <Footer />
      </main>
    </React.Fragment>
  );
}

export default App;

const Container = styled.main``;
