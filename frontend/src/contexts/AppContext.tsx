import React, { useState } from "react";
import { ToastMessage, AppContext } from "../types/mainTypes";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client.ts";

//When app loads for first time, context is undefined
const AppContext = React.createContext<AppContext | undefined>(undefined);

//Gives context to all children of app
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  console.log("Empieza");
  const { isError, isLoading } = useQuery(
    "validateToken",
    apiClient.validateToken,
    {
      retry: false,
    }
  );
  console.log("Termina");

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage: ToastMessage) => {
          setToast(toastMessage);
          console.log(toastMessage);
        },
        isLoggedIn: isLoading ? false : !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

//Hook that components can use to access context
export const useAppContext = (): AppContext => {
  const context = React.useContext(AppContext);
  return context as AppContext;
};
