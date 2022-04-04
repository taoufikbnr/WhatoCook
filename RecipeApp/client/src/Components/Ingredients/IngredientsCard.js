import React, { useState } from 'react'
import {ingredients} from "./Ingredientdata"
import "./ingredient.css";
import { Button } from 'react-bootstrap';

const IngredientsCard = ({setsearch}) => {
    const [first, setfirst] = useState(ingredients)
    // const [isActive, setActive] = useState("false");

    // const handleToggle = (id) => {
    //   setActive(!isActive);
    // };

  return (
    <div>
      
      {first.map((el,i)=><button className="ingredient-button inactive"
    
      onClick={(e)=>{setsearch(e.target.innerHTML) 
        // handleToggle(e.target.innerHTML)


    }}>
        {el.ingredient}
        </button>)}
    
    </div>
  )
}

export default IngredientsCard