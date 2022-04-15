import React, { useEffect, useState } from 'react'
import "./errors.css"


const HandleErrors = ({error}) => {
    const [show, setshow] = useState(true)

    useEffect(() => {
            setTimeout(() => {
                setshow(false) }, 3000);
      },[]);

  return (
    <>
    <div className='errors'>{show && error.map(el=>el.msg)}</div>
    </>
  )
}

export default HandleErrors;