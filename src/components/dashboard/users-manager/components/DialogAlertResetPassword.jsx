import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { resetPassword } from "../../../../api/stock-manager";

export default function DialogAlertResetPassword({
  open,
  handleClose,
  selectedItem,
  onSuccess,
}) {
  const handleSubmitForm = () => {
    const payload = {
      id: selectedItem.id,
      email: selectedItem.email,
      stock_email: process.env.REACT_APP_STOCK_EMAIL,
      stock_password: process.env.REACT_APP_STOCK_PASSWORD,
    };
    resetPassword(payload)
      .then((res) => {
        handleClose();
        onSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Xác nhận đặt lại mật khẩu cho: {selectedItem && selectedItem.name}
          {selectedItem && selectedItem.full_name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Mật khẩu mới sẽ được tự động gửi qua email:{" "}
            {selectedItem && selectedItem.email}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
          <Button onClick={handleSubmitForm} color="primary" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
