import React from "react";
// import {Button} from '@mui/material';
import { AuthConsumer, AuthProvider, AuthProviderData } from "./AuthProvider";

export const Auth = ({ children }) => {
  return (
    <AuthProvider>
      <AuthConsumer>
        {(value) =>
          value.provider ? (
            <>{children}</>
          ) : (
            <button onClick={value.login}>Login</button>
          )
        }
      </AuthConsumer>
    </AuthProvider>
  );
};
