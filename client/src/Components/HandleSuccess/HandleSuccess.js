import React, { useEffect, useState } from 'react'
import "./success.css"


const HandleSuccess = ({msg}) => {
    const [show, setshow] = useState(true)

    useEffect(() => {
            setTimeout(() => {
                setshow(false) }, 3000);
      },[]);

  return (
    <>
    <div className='success'>{show && msg}</div>
    </>
  )
}

export default HandleSuccess