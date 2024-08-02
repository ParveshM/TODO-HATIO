import { BrowserRouter } from "react-router-dom";
import MainRouter from "./routes/router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/Store";
import ErrorBoundary from "./components/Error/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <MainRouter />
          <Toaster />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
