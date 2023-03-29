import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import get_detail_dish from "../../api/get_detail_dish";
import { Image } from "antd";
import { Box } from "@mui/material";
import numberWithCommas from "../util/numberThousandSeparator";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailDish(props) {
  
  const [data, setData] = React.useState();
  React.useEffect(() => {
    (async () => {
      const result = await get_detail_dish(props?.dishId);
      return setData(result)
    })();
  }, [props?.dishId, props?.open]);

  const handleClose = () => {
    props?.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props?.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{data?.dish_name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Image src={data?.image_dish} style={{width: 450, aspectRatio: 3 / 2, objectFit: "cover", zIndex: 99999}} />
            <Box>
                <div style={{margin: "10px 0"}}>Mô tả: {data?.dish_description}</div>
                <div style={{margin: "10px 0"}}>Giá: <span style={{color: "red"}}>{numberWithCommas(parseInt(data?.dish_price))}đ</span></div>

            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
          <Button onClick={handleClose}>Đặt món</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
