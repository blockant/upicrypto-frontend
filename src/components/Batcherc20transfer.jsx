import { useState } from "react";
import "./Form.css";

export default function Batcherc20transfer() {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [withPm, setWithPm] = useState(false);
  const [transactionHash, setTransactionHash] = useState("0x");
  const [formValues, setFormValues] = useState({
    tkn: "",
    amt: "",
  });

  function handleAddAddress(event) {
    event.preventDefault();
    setAddresses([...addresses, newAddress]);

    setNewAddress("");
  }

  function handleRemoveAddress(index) {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:30001/batcherc20-transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formValues, t: addresses, withPM: withPm }),
    });
    const data = await response.json();
    setTransactionHash(data.transactionHash);
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
        <h2>Batch Erc20 Transfer</h2>
        <label className="label" htmlFor="token">
          Token:
        </label>
        <input
          className="input"
          type="text"
          id="token"
          name="tkn"
          onChange={handleChange}
        />
        <br />
        <label className="label" htmlFor="to">
          To:
        </label>
        {addresses.map((address, index) => (
          <div key={index}>
            <span className="transaction-hash to">{address}</span>

            <button
              className="remove-button"
              onClick={() => handleRemoveAddress(index)}
            >
              x
            </button>
          </div>
        ))}
        <div>
          <input
            style={{ width: 610 }}
            className="input"
            type="text"
            value={newAddress}
            onChange={(event) => setNewAddress(event.target.value)}
          />
          <button className="add-button" onClick={handleAddAddress}>
            +
          </button>
        </div>

        <br />
        <label className="label" htmlFor="amount">
          Amount:
        </label>
        <input
          className="input"
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
          Submit
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
