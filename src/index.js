import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </UserProvider>
    
    
  </React.StrictMode>,
  document.getElementById('root')
);

// const app = createApp(App).mount('#app');
// app.use(VueSmoothScroll)

// const cors = require("cors");
// App.use(cors({
//   origin:"http://localhost:3000",
//   methods: ["GET","POST","PUT","DELETE"],
  
// }))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
