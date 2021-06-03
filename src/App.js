import React from "react";
import DataProvider from "./GlobalState";
import MainPages from "./MainPages";
import { ToastProvider } from "react-toast-notifications";
import dotenv from "dotenv";

dotenv.config();

const App = () => {
  return (
    <ToastProvider>
      <DataProvider>
        <MainPages />
      </DataProvider>
    </ToastProvider>
  );
};

export default App;
