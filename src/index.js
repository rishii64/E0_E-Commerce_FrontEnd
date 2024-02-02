import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import Store from './Redux/Store'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: "AYcrPM0HTkrf3LxQ1ppSJER03HHBRoOZRzNinaKXEi-fc4Xu27yTV1fJQEwBcU5c7HUMlhEBVtdf2c_d",
  currency: "USD",
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <PayPalScriptProvider options={initialOptions}>
          <App />
        </PayPalScriptProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

