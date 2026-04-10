import React, { useState } from "react";

const AddLogForm = ({ onAddLog }) => {
  const [activity, setActivity] = useState("");
  const [emissions, setEmissions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!activity || !emissions) {
      alert("Please fill in all fields");
      return;
    }

    const newLog = {
      activity,
      emissions: Number(emissions)
    };

    onAddLog(newLog);

    // Reset form
    setActivity("");
    setEmissions("");
  };

  return (
  <div>
    <h3>Add Activity</h3>

    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Activity"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />

      <input
        type="number"
        placeholder="Emissions"
        value={emissions}
        onChange={(e) => setEmissions(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  </div>
);
};

export default AddLogForm;