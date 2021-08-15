import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteCategory } from "../../../../api/stock-manager";

export default function DialogAlertRemove({
  open,
  handleClose,
  selectedItem,
  onSuccess,
}) {
  const handleSubmitForm = () => {
    const payload = {
      id: selectedItem.id,
    };
    console.log(payload);
    deleteCategory(payload)
      .then((res) => {
        console.log(res);
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
          Xác nhận xoá: {selectedItem && selectedItem.name} (id:
          {selectedItem && selectedItem.id})
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn sẽ không thể phục hồi dữ liệu đã bị xoá
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Không đồng ý
          </Button>
          <Button onClick={handleSubmitForm} color="primary" autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
