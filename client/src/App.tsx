import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes/router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/Store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MainRouter />
        <Toaster />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
