import { useState } from "react";
import "./Form.css";

export default function Erc20transfer() {
  const [withPm, setWithPm] = useState(false);
  const [transactionHash, setTransactionHash] = useState("0x");
  const [invalidToAddress, setInvalidToAddress] = useState(false);
  const [invalidValue, setInvalidValue] = useState(false);
  const [invalidTokenAddress, setInvalidTokenAddress] = useState(false);

  const [formValues, setFormValues] = useState({
    tkn: "",
    amt: "",
    t: "",
  });

  function checkInvalidTokenAddress(address) {
    if (address.length !== 42) {
      setInvalidTokenAddress(true);
      return true;
    } else {
      setInvalidTokenAddress(false);
      return false;
    }
  }
  function checkInvalidToAddress(address) {
    if (address.length !== 42) {
      setInvalidToAddress(true);
      return true;
    } else {
      setInvalidToAddress(false);
      return false;
    }
  }
  function checkInvalidValue(value) {
    if (value <= 0) {
      setInvalidValue(true);
      return true;
    } else {
      setInvalidValue(false);
      return false;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const invalidToken = checkInvalidTokenAddress(formValues.tkn);
    const invalidTo = checkInvalidToAddress(formValues.t);
    const invalidValue = checkInvalidValue(formValues.amt);
    if (invalidToken || invalidValue || invalidTo) {
      return;
    }
    try {
      const response = await fetch("http://localhost:30001/erc20-transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formValues, withPM: withPm }),
      });
      const data = await response.json();
      setTransactionHash(data.txHash);
    } catch (error) {
      console.log("Error while Fetching Data", error);
    }
  };

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Erc20Transfer</h2>
        <label className="label" htmlFor="token">
          Token:
        </label>
        {invalidTokenAddress && (
          <text className="error">Please enter valid Address</text>
        )}
        <input
          className={`input ${invalidTokenAddress ? "error" : ""}`}
          type="text"
          id="token"
          name="tkn"
          onChange={handleChange}
        />
        <br />
        <label className="label" htmlFor="to">
          To:
        </label>
        {invalidToAddress && (
          <text className="error">Please enter valid Address</text>
        )}
        <input
          className={`input ${invalidToAddress ? "error" : ""}`}
          type="text"
          id="to"
          name="t"
          onChange={handleChange}
        />
        <br />
        <label className="label" htmlFor="amount">
          Amount:
        </label>
        {invalidValue && (
          <text className="error">Please enter valid Amount</text>
        )}
        <input
          className={`input ${invalidValue ? "error" : ""}`}
          type="text"
          id="amt"
          name="amt"
          onChange={handleChange}
        />
        <br />
        <label className="label" htmlFor="withPm">
          With PM:
        </label>
        <label className="label">
          <input
            type="radio"
            value="yes"
            checked={withPm === true}
            onChange={() => setWithPm(true)}
          />
          Yes
        </label>
        <label className="label">
          <input
            type="radio"
            value="no"
            checked={withPm === false}
            onChange={() => setWithPm(false)}
          />
          No
        </label>
        <br />
        <button className="button" type="submit">
          Transfer
        </button>
        {transactionHash && (
          <>
            <br />
            <div className="transaction-hash">
              Transaction Hash: {transactionHash}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
