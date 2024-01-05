import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Characters from "./components/characters/Characters";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <Characters /> }]);
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}></PersistGate>
        <Navbar />
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
