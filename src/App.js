import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Batcherc20transfer from "./components/Batcherc20transfer";
import Batchtransfer from "./components/Batchtransfer";
import Erc20transfer from "./components/Erc20transfer";
import Transfer from "./components/Transfer";
import Button from "./components/Button";
import GetAddress from "./components/GetAddress";
import { Auth } from "./Features/Auth";
import { AuthConsumer, AuthProvider } from "./Features/Auth/AuthProvider";
import Login from "./components/Login";

function App() {
  const navigate = useNavigate();
  return (
    <div>
      <Header />

      <AuthProvider>
        <AuthConsumer>
          {(auth) => {
            console.log("Auth", auth.provider);
            // if (!auth.provider) {
            //   //   console.log("here");
            //   //   navigate("/login");
            //   <Login auth={auth} />;
            // }
            // // if (auth.provider) {
            // //   navigate("/");
            // // }

            return (
              <Routes>
                {auth.provider ? (
                  <>
                    <Route path="/" element={<GetAddress />} />
                    <Route
                      path="/batchERC20Transfer"
                      element={<Batcherc20transfer />}
                    />
                    <Route
                      path="/batchUtilityTransfer"
                      element={<Batchtransfer />}
                    />
                    <Route path="/erc20Transfer" element={<Erc20transfer />} />
                    <Route path="/utilityTransfer" element={<Transfer />} />
                  </>
                ) : (
                  <Route path="/" exact element={<Login auth={auth} />} />
                )}
              </Routes>
            );
          }}
        </AuthConsumer>
      </AuthProvider>
    </div>
  );
}

export default App;
