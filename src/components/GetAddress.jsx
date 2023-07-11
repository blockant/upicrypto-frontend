import { useState } from "react";
import "./Form.css";

export default function GetAddress() {
  const [address, setAddress] = useState("");

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
    <div className="form">
      <button className="button" onClick={getAddress}>
        Get Address
      </button>
      <br />
      <div className="transaction-hash">Addrress: {address ? address : ""}</div>
    </div>
  );
}
