import { useState } from "react";
import "./Form.css";

export default function Batchtransfer() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [withPm, setWithPm] = useState(false);
  const [transactionHash, setTransactionHash] = useState("0x");
  const [invalidToAddress, setInvalidToAddress] = useState(false);
  const [invalidValue, setInvalidValue] = useState(false);
  const [formValues, setFormValues] = useState({
    amt: "",
  });

  function handleAddAddress(event) {
    event.preventDefault();
    if (newAddress.length === 42) {
      setAddresses([...addresses, newAddress]);
      setNewAddress("");
      setInvalidToAddress(false);
    } else {
      setInvalidToAddress(true);
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
  function checkInvalidTo(addresses) {
    if (addresses.length === 0) {
      setInvalidToAddress(true);
      return true;
    } else {
      return false;
    }
  }

  function handleRemoveAddress(index) {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const invalidValue = checkInvalidValue(formValues.amt);
    const invalidTo = checkInvalidTo(addresses);

    if (invalidValue || invalidTo) {
      return;
    }
    const response = await fetch("http://localhost:30001/batch-transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formValues, t: addresses, withPM: withPm }),
    });
    const data = await response.json();
    setTransactionHash(data.txHash);
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
        <h2>Batch Transfer</h2>
        <label className="label" htmlFor="to">
          To:
        </label>
        {invalidToAddress && (
          <text className="error">Please enter valid Address</text>
        )}

        <div className="address-container">
          {addresses.map((address, index) => (
            <div key={index} className="address-item">
              <span className="transaction-hash to">{address}</span>
              <button
                className="remove-button"
                onClick={() => handleRemoveAddress(index)}
              >
                x
              </button>
            </div>
          ))}
        </div>
        <br />

        <input
          // style={{ width: 610 }}
          className={`input ${invalidToAddress ? "error" : ""}`}
          type="text"
          value={newAddress}
          onChange={(event) => setNewAddress(event.target.value)}
        />
        <button className="add-button" onClick={handleAddAddress}>
          +
        </button>

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
          id="amount"
          name="amt"
          onChange={handleChange}
        />
        <br />
        <label className="label" htmlFor="withPm">
          With PM:
        </label>
        <label>
          <input
            type="radio"
            value="yes"
            checked={withPm === true}
            onChange={() => setWithPm(true)}
          />
          Yes
        </label>
        <label>
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
