import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
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
  // modal value
  const [typeId, setTypeId] = useState("1");
  const [statusId, setStatusId] = useState("1");
  const [stockId, setStockId] = useState("1");
  const [description, setDescription] = useState("");
  const [inputTime, setInputTime] = useState(new Date());
  const [expiryTime, setExpiryTime] = useState(null);
  const [outputTime, setOutputTime] = useState(null);

  // list options
  const [statusOptions, setStatusOptions] = useState([]);
  const [stockOptions, setStockOptions] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);

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

  const handleSubmitForm = () => {
    const payload = {
      type: typeId,
      input_time: inputTime ? format(inputTime, "yyyy-MM-dd") : null,
      output_time: outputTime ? format(outputTime, "yyyy-MM-dd") : null,
      expiry_time: expiryTime ? format(expiryTime, "yyyy-MM-dd") : null,
      status: statusId,
      stock_id: stockId,
      description: description,
    };
    console.log(payload);
    addItem(payload)
      .then((res) => {
        console.log("pl: ", payload);
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
        <DialogTitle id="form-dialog-title">Add new Item</DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <Select
              native
              fullWidth
              label="Name"
              value={typeId}
              onChange={handleTypeIdChange}
            >
              {itemTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <Select
              native
              fullWidth
              label="Status"
              value={statusId}
              onChange={handleStatusChange}
            >
              {statusOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <Select
              displayEmpty
              native
              fullWidth
              label="Stock"
              value={stockId}
              onChange={handleStockChange}
            >
              {stockOptions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-between">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
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
                  format="dd/MM/yyyy"
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
                  format="dd/MM/yyyy"
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
