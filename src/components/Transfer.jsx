import { useState } from "react";
import "./Form.css";

export default function Transfer() {
  const [withPm, setWithPm] = useState(false);
  const [transactionHash, setTransactionHash] = useState("0x");

  const [formValues, setFormValues] = useState({
    amt: "",
    t: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:30001/transfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formValues, withPM: withPm }),
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
        <h2>Transfer</h2>
        {/* <label className="label" htmlFor="token">
          Token:
        </label>
        <input
          className="input"
          type="text"
          id="token"
          name="token"
          onChange={handleChange}
        />
        <br /> */}
        <label className="label" htmlFor="to">
          To:
        </label>
        <input
          className="input"
          type="text"
          id="to"
          name="t"
          onChange={handleChange}
        />
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
