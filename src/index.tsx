import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import styled from "styled-components";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const StyledApp = styled(App)`
  margin: 0;
`;

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <StyledApp />
    </Provider>
  </BrowserRouter>
);
