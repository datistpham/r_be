import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import { Button } from 'antd'
import { List, ListItem, TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateInfo(props) {
  const [firstName, setFirstName]= useState(props?.firstName)
  const [lastName, setLastName]= useState(props?.lastName)
  const [email, setEmail]= useState(props?.email)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type={"primary"} variant="outlined" onClick={handleClickOpen}>
        Cập nhật
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Cập nhật thông tin"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <List>
                <ListItem>
                    <TextField style={{width: 350}} label={"Họ"} value={firstName} onChange={(e)=> setFirstName(e.target.value)} />
                </ListItem>
                <ListItem>
                    <TextField style={{width: 350}} label={"Tên"} value={lastName} onChange={(e)=> setLastName(e.target.value)} />
                </ListItem>
                <ListItem>
                    <TextField style={{width: 350}} label={"Email"} value={email} onChange={(e)=> setEmail(e.target.value)} />
                </ListItem>
                
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button type={"primary"} onClick={handleClose}>Cập nhật</Button>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}