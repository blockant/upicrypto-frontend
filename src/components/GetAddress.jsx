import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function GetAddress() {
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  function Navigate(url) {
    navigate(url);
  }

  async function getAddress() {
    try {
      const response = await fetch("http://localhost:30001/simple-account");
      const data = await response.json();
      setAddress(data.address);
    } catch (error) {
      console.log("Error occured while Seding data ", error);
    }
  }

  return (
    <>
      <div className="form">
        <button className="button" onClick={getAddress}>
          Get Address
        </button>
        <br />
        <div className="transaction-hash">
          Addrress: {address ? address : ""}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <button
          className="navigate-button"
          onClick={() => Navigate("/batchERC20Transfer")}
        >
          BatchErc20Transfer
        </button>
        <button
          className="navigate-button"
          onClick={() => Navigate("/batchUtilityTransfer")}
        >
          BatchTransfer
        </button>
        <button
          className="navigate-button"
          onClick={() => Navigate("/erc20Transfer")}
        >
          Erc20Transfer
        </button>
        <button
          className="navigate-button"
          onClick={() => Navigate("/utilityTransfer")}
        >
          Transfer
        </button>
      </div>
    </>
  );
}
