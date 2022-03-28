import React from "react";
import { MultiSelect } from "react-multi-select-component";

const Select = ({ingredient , setingredient}) => {

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  ];

  return (
    <div>
      <h1>Select Fruits</h1>
      <MultiSelect
        options={options}
        value={ingredient}
        onChange={setingredient}
        labelledBy="Select"
      />
    </div>
  );
};

export default Select;
