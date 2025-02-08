import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router } from "react-router-dom";
import { SocketProvider } from "./context/SocketProvider.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketProvider>
      <Router>
        <App />
        <Toaster position="top-right" reverseOrder={false} gutter={8} />
      </Router>
    </SocketProvider>
  </Provider>
);
