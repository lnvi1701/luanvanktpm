import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { addItem } from "../../../../api/stock-manager";
import { getItemTypes } from "../../../../meta-data/item-types";
import { statuses } from "../../../../meta-data/statuses";
import { stocks } from "../../../../meta-data/stocks";


export default function DialogAddNewItem({
  open,
  handleClose,
  onUpdateSuccess,
}) {
  
  // Modal values
  const [typeId, setTypeId] = useState("");
  const [statusId, setStatusId] = useState("");
  const [stockId, setStockId] = useState("");
  const [description, setDescription] = useState("");
  const [inputTime, setInputTime] = useState(new Date());
  const [expiryTime, setExpiryTime] = useState(null);
  const [outputTime, setOutputTime] = useState(null);
  const [quality, setQuality] = useState(""); // You can add state for quality

  // List options
  const [statusOptions, setStatusOptions] = useState([{ label: "", value: "" }]);
  const [stockOptions, setStockOptions] = useState([{ label: "", value: "" }]);
  const [itemTypes, setItemTypes] = useState([{ label: "", value: "" }]);
  const [typeIdErr, setTypeIdErr] = useState(null);

  useEffect(() => {
    const getStatuses = async () => {
      const listStt = await statuses();
      setStatusOptions(listStt);
    };
    const getStocks = async () => {
      const listStocks = await stocks();
      setStockOptions(listStocks);
    };
    const getListItemTypes = async () => {
      const itemTypes = await getItemTypes();
      setItemTypes(itemTypes);
    };

    getStatuses();
    getStocks();
    getListItemTypes();
  }, []);

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setStatusId(value);
  };

  const handleStockChange = (event) => {
    const { value } = event.target;
    setStockId(value);
  };

  const handleTypeIdChange = (event) => {
    const { value } = event.target;
    setTypeId(value);
  };

  const handleCheckValidateQuality = (event) => {
    if (!event.target.value) {
      setTypeIdErr("Vui lòng nhập số lượng!");
    } else {
      setTypeIdErr(null);
      setQuality(event.target.value);
    }
  };

  const handleSubmitForm = () => {
  const formatDate = (date) => {
    return date ? format(date, "yyyy-MM-dd") : null;
  };

  const payload = {
    type: typeId,
    input_time: formatDate(inputTime),
    output_time: formatDate(outputTime),
    expiry_time: formatDate(expiryTime),
    status: statusId,
    stock_id: stockId,
    description: description,
  };

  console.log(payload);
  addItem(payload)
    .then((res) => {
      console.log("Payload: ", payload);
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
        <DialogTitle id="form-dialog-title">Thêm mới thiết bị</DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <Select
              native
              fullWidth
              label="Tên sản phẩm"
              value={typeId}
              onChange={handleTypeIdChange}
            >
              {itemTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label === "" ? "Tất cả" : item.label}
                </option>
              ))}
            </Select>
            <TextField
              fullWidth
              label="Số lượng"
              value={quality}
              onChange={handleCheckValidateQuality} // Thêm sự kiện onChange
              onBlur={handleCheckValidateQuality}
              error={typeIdErr}
              helperText={typeIdErr}
            />
            <Select
              native
              fullWidth
              label="Trạng thái sản phẩm "
              value={statusId}
              onChange={handleStatusChange}
            >
              {statusOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label === "" ? "Tất cả" : item.label}
                </option>
              ))}
            </Select>
            <Select
              native
              fullWidth
              label="Vị trí kho"
              value={stockId}
              onChange={handleStockChange}
            >
              {stockOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label === "" ? "Tất cả" : item.label}
                </option>
              ))}
            </Select>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-between">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd-MM-yyyy"
                  margin="normal"
                  label="Ngày nhập"
                  value={inputTime}
                  onChange={(val) => setInputTime(val)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd-MM-yyyy"
                  margin="normal"
                  label="Ngày hết hạn"
                  value={expiryTime}
                  onChange={(val) => setExpiryTime(val)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                <KeyboardDatePicker
                  disabled
                  disableToolbar
                  variant="inline"
                  format="dd-MM-yyyy"
                  margin="normal"
                  label="Ngày xuất"
                  value={outputTime}
                  onChange={(val) => setOutputTime(val)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <TextareaAutosize
              value={description}
              className="textArea"
              aria-label="minimum height"
              minRows={3}
              placeholder="Mô tả"
              onChange={(e) => setDescription(e.target.value)}
            />
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