import React from "react";
import { MultiSelect } from "react-multi-select-component";

const Select = ({ingredient , setingredient,search , setsearch, isFilter}) => {

  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🍍", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry"},
    { label: "poop 💩", value: "poop"},

    
     //disabled: true 
  ]
  return (
    <div>
      <h6>Select Fruits</h6>
      <MultiSelect
        options={options}
        value={isFilter ? search : ingredient}
        onChange={isFilter ? setsearch : setingredient}
        labelledBy="Select"
      />
    </div>
  );
};

export default Select;
