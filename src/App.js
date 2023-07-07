import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Batcherc20transfer";
import Batchtransfer from "./components/Batchtransfer";
import Erc20transfer from "./components/Erc20transfer";
import Transfer from "./components/Transfer";
import Button from "./components/Button";

function App() {
  return (
    <div>
      <Header />
      {/* <Button /> */}
      <Form />
      <Batchtransfer />
      <Erc20transfer />
      <Transfer />
    </div>
  );
}

export default App;
