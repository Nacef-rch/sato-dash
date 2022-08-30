import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';

export default function FormDialog({
  title,
  openDiag,
  handleDialogClick,
  children,
}) {
  const handleClose = () => {
    handleDialogClick();
  };

  return (
    <Dialog open={openDiag} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
