import { Button, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

function DeleteModal(props) {

    const {
        selectedItem,
        selectedItemList,
        handleClose,
        open,
        handleDelete
    } = props;

  return (
    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
>
    <DialogTitle id="responsive-dialog-title">
        {"Confirm Delete Skill?"}
    </DialogTitle>
    <DialogContent>
        <DialogContentText>
            Are you sure you want to delete the selected: {selectedItem ? selectedItem?.title : selectedItemList?.map(x => (x + ", "))}
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button autoFocus color="primary" onClick={handleClose}>
            Cancel
        </Button>
        <Button onClick={handleDelete} color="error" autoFocus>
            Delete
        </Button>
    </DialogActions>
</Dialog>
  )
}

export default DeleteModal;