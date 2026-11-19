"use client";

import { useState } from "react";
import { useFitMe } from "@/components/fitme/FitMeProvider";

function today() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export default function WeightLogForm() {
  const { unit, actions } = useFitMe();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(today);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0 || value > 500) {
      setSaved(false);
      setError("Enter a weight between 0 and 500.");
      return;
    }

    if (!date) {
      setSaved(false);
      setError("Choose the date for this weigh-in.");
      return;
    }

    actions.logWeight(value, date);
    setAmount("");
    setError("");
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="weight-form">
        <label className="sr-only" htmlFor="weight-amount">Weight in {unit}</label>
        <input
          className="field"
          id="weight-amount"
          inputMode="decimal"
          max="500"
          min="0.1"
          onChange={(event) => {
            setAmount(event.target.value);
            setSaved(false);
          }}
          placeholder={`Weight (${unit})`}
          step="0.1"
          type="number"
          value={amount}
        />
        <label className="sr-only" htmlFor="weight-date">Weigh-in date</label>
        <input
          className="field"
          id="weight-date"
          onChange={(event) => {
            setDate(event.target.value);
            setSaved(false);
          }}
          type="date"
          value={date}
        />
        <button className="button-primary" type="submit">Save</button>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      {saved && <p className="form-success" role="status">Weigh-in saved.</p>}
    </form>
  );
}
