import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addStaffRequest, getItem } from "../../../../api/stock-manager";
import { statuses } from "../../../../meta-data/statuses";
import { stocks } from "../../../../meta-data/stocks";

function DialogEditRequest({
  open,
  handleClose,
  onUpdateSuccess,
  user,
  selectedRequest,
}) {
  // modal values
  const [typeId, setTypeId] = useState("");
  const [itemId, setItemId] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(
    selectedRequest.updated_status_id
  );
  const [updatedStock, setUpdatedStock] = useState(
    selectedRequest.updated_stock
  );
  const [detail, setDetail] = useState(selectedRequest.detail);
  const [updatedAddress, setUpdatedAddress] = useState(
    selectedRequest.update_address
  );

  // list options
  const [statusOptions, setStatusOptions] = useState([]);
  const [stockOptions, setStockOptions] = useState([]);

  // current item
  const [selectedItem, setSelectedItem] = useState("");

  const getStatuses = async () => {
    const listStt = await statuses();
    setStatusOptions(listStt);
  };
  const getStocks = async () => {
    const listStocks = await stocks();
    setStockOptions(listStocks);
  };
  const getStateItem = async (id) => {
    const data = await getItem(id);
    console.log(data);
    setSelectedItem(data);
  };

  useEffect(() => {
    getStatuses();
    getStocks();
    getStateItem(selectedRequest.item_id);
  }, []);

  const handleSubmitForm = () => {
    const payload = {
      staff_id: user.id,
      date_time: format(new Date(), "yyyy-MM-dd"),
      item_id: itemId,
      detail: detail,
      current_status: selectedItem.status_id,
      updated_status: updatedStatus,
      updated_address: updatedAddress,
      current_stock: selectedItem.stock_id,
      updated_stock: updatedStock,
      type: typeId,
    };
    console.log(payload);
    addStaffRequest(payload)
      .then((res) => {
        onUpdateSuccess();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="dialogEditItem">
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Chi tiết</DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <InputLabel>Loại thiết bị: {selectedItem.name}</InputLabel>
            <InputLabel>Mã thiết bị: {selectedRequest.item_id}</InputLabel>
            <InputLabel>Trạng thái hiện tại: {selectedItem.status}</InputLabel>
            <InputLabel>Kho hiện tại: {selectedItem.stock}</InputLabel>
            <InputLabel>
              Địa chỉ sau khi duyệt: {selectedRequest.update_address}
            </InputLabel>
            <InputLabel>Chi tiết: {selectedRequest.detail}</InputLabel>
            <FormControl fullWidth>
              <InputLabel>Trạng thái sau khi duyệt</InputLabel>
              <Select fullWidth value={updatedStatus}>
                {statusOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Kho sau khi duyệt</InputLabel>
              <Select fullWidth label="Stock" value={updatedStock}>
                {stockOptions &&
                  stockOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitForm} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(DialogEditRequest);
