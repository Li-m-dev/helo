import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import routes from "./routes";
import store from "./ducks/store";
import Nav from "./Nav/Nav";
import "./scss/App.css";
// import Auth from "./Auth/Auth";
// import Dashboard from "./Dashboard/Dashboard";
// import Form from "./Form/Form";
// import Nav from "./Nav/Nav";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <Nav />
            {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
