import ReactDOM from "react-dom/client";
import App from "../src/App.tsx";

import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux"; 

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
