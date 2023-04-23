import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField } from '@mui/material';
import { useState } from 'react';
import swal from 'sweetalert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FoodOnDemand(props) {
  const [dishName, setDishName]= useState("")
  const [dishDescription, setDishDescription]= useState("")
  const [dishPrice, setDishPrice]= useState()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div variant="outlined" onClick={handleClickOpen}>
        Món theo yêu cầu
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Đặt món theo yêu cầu"}</DialogTitle>
        <DialogContent>
          <TextField value={dishName} onChange={(e)=> setDishName(e.target.value)} label={"Tên món ăn"} style={{width: 550, height: 40, margin: "12px 0"}} />
          <TextField value={dishDescription} onChange={(e)=> setDishDescription(e.target.value)} label={"Mô tả"} style={{width: 550, height: 40, margin: "12px 0"}} />
          <TextField value={dishPrice} onChange={(e)=> setDishPrice(e.target.value)} type={"number"} label={"Giá tiền"} style={{width: 550, height: 40, margin: "12px 0"}} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          <Button onClick={()=> {
            swal("Thông báo", "Yêu cầu đặt món thành công", "success")
            .then(()=> handleClose())
            .then(()=> props?.handleClose())
          }}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}