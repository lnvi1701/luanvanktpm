import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { approveItem, getItem } from "../../../../api/stock-manager";
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
    console.log(selectedRequest);
    setSelectedItem(data);
  };

  useEffect(() => {
    getStatuses();
    getStocks();
    getStateItem(selectedRequest.item_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitForm = (requestStatus) => {
    const payload = {
      request_id: selectedRequest.id,
      request_status: requestStatus,
      item_id: selectedItem.id,
      item_status: selectedRequest.updated_status_id,
      output_time: format(new Date(), "yyyy-MM-dd"),
      stock_id: selectedRequest.updated_stock,
    };
    console.log(payload);

    approveItem(payload)
      .then((res) => {
        console.log(res);
        onUpdateSuccess();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderApproveButton =
    user.isAdmin && selectedRequest.status === "waiting" ? (
      <div>
        <Button
          onClick={() => handleSubmitForm("not_approved")}
          color="primary"
        >
          Không duyệt
        </Button>
        <Button onClick={() => handleSubmitForm("approved")} color="primary">
          Duyệt
        </Button>
      </div>
    ) : null;

  return (
    <div className="dialogEditItem">
      <Dialog open={open} fullWidth maxWidth="sm" onClose={handleClose}>
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
            <InputLabel>Nhân viên: {selectedRequest.full_name}</InputLabel>
            <FormControl fullWidth>
              <InputLabel>Trạng thái sau khi duyệt</InputLabel>
              <Select fullWidth value={selectedRequest.updated_status_id}>
                {statusOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Kho sau khi duyệt</InputLabel>
              <Select
                fullWidth
                label="Stock"
                value={selectedRequest.updated_stock}
              >
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
            Huỷ
          </Button>
          {renderApproveButton}
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
