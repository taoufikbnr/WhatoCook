import React from "react";
import { MultiSelect } from "react-multi-select-component";

const Select = ({ingredient , setingredient}) => {

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🍍", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry"},
     //disabled: true 
  ]
  return (
    <div>
      <h6>Select Fruits</h6>
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
