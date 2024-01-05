import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Characters from "./components/characters/Characters";
import { Provider } from "react-redux";
import store from "./redux/store/store";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <Characters /> }]);
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar />
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
