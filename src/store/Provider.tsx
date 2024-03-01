"use client";
import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store";
const Providers = ({ children }: { children: React.ReactNode }) => {
  const persist = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persist} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default Providers;
