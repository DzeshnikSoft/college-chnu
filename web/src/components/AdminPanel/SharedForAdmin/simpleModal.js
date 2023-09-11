import React, { useEffect, useState } from 'react'
import {Dialog, DialogTitle, DialogActions, Button} from "@mui/material";

const SimpleModal = ({handleSubmit, handleClose}) => {
    const [open, setOpen] = useState(true);
    useEffect(()=>{
        console.log("hello")
    },[])
    const onClose = () =>{
        setOpen(false);
        handleClose();
    }
  return  <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Hello
        </DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={onClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
  
}

export default SimpleModal  