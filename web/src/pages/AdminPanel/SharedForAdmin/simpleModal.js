import React, { useEffect, useState } from 'react'

const SimpleModal = ({handleSubmit, handleClose}) => {
    const [open, setOpen] = useState(true);
    useEffect(()=>{
        console.log("hello")
    },[])
    const onClose = () =>{
        setOpen(false);
        handleClose();
    }
  return  <></>
  
}

export default SimpleModal  