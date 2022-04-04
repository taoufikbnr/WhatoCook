import React from 'react'
import { MultiSelect } from 'react-multi-select-component'

const SearchForm = ({search,setsearch}) => {
    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🍍", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry"}]
    
  return (
    <div style={{width:150}}>
    <h6>Select Fruits</h6>
    <MultiSelect
      options={options}
      value={search}
      onChange={setsearch}
      labelledBy="Select"
    />
  </div>
  )
}

export default SearchForm