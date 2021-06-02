import React, { useContext } from "react";
import DataProvider from "./GlobalState";
import MainPages from "./MainPages";
import { ToastProvider } from "react-toast-notifications";
import dotenv from 'dotenv';

dotenv.config()

const App = () => {

  return (
    <DataProvider>
      <ToastProvider>
        <MainPages />
      </ToastProvider>
    </DataProvider>
  );
};

export default App;
