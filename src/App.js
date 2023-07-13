import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Batcherc20transfer";
import Batchtransfer from "./components/Batchtransfer";
import Erc20transfer from "./components/Erc20transfer";
import Transfer from "./components/Transfer";
import Button from "./components/Button";
import GetAddress from "./components/GetAddress";
import { Auth } from "./Features/Auth";
import { AuthConsumer } from "./Features/Auth/AuthProvider";

function App() {
  return (
    <div>
      <Auth>
        <Header />

        <GetAddress />

        <Form />

        <AuthConsumer>
          {(auth) =>
            auth.provider ? (
              <>
                <Batchtransfer />
                <Erc20transfer />
                <Transfer />
                <Button onClick={auth.logout}>Logout</Button>
              </>
            ) : (
              <button onClick={auth.login}>Login</button>
            )
          }
        </AuthConsumer>
      </Auth>
    </div>
  );
}

export default App;
