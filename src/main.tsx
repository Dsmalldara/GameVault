import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import store, { persistor } from "./states-manager/store";
import { Provider } from "react-redux";
import "./index.css";
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={"loading"}>
          <App />
    </PersistGate>     
    </Provider>
  </React.StrictMode >
)
