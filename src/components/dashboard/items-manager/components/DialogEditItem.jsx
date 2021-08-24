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
import React, { useEffect, useState } from "react";
import { getItemTypes } from "../../../../meta-data/item-types";
import { statuses } from "../../../../meta-data/statuses";
import { stocks } from "../../../../meta-data/stocks";
import "./DialogEditItem.scss";
import { format } from "date-fns";
import { updateItem } from "../../../../api/stock-manager";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";

function DialogEditItem({
  open,
  handleClose,
  selectedItem,
  onUpdateSuccess,
  user,
}) {
  // modal value
  const [typeId, setTypeId] = useState(selectedItem.type_id);
  const [statusId, setStatusId] = useState(selectedItem.status_id);
  const [stockId, setStockId] = useState(selectedItem.stock_id);
  const [description, setDescription] = useState(
    selectedItem.description || ""
  );
  const [inputTime, setInputTime] = useState(
    selectedItem.input_time ? new Date(selectedItem.input_time) : null
  );
  const [expiryTime, setExpiryTime] = useState(
    selectedItem.expiry_time ? new Date(selectedItem.expiry_time) : null
  );
  const [outputTime, setOutputTime] = useState(
    selectedItem.output_time ? new Date(selectedItem.output_time) : null
  );

  // list options
  const [statusOptions, setStatusOptions] = useState([]);
  const [stockOptions, setStockOptions] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);

  useEffect(() => {
    const getStatuses = async () => {
      const listStt = await statuses();
      console.log(listStt);
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
      id: selectedItem.id,
      type: typeId,
      input_time: inputTime ? format(inputTime, "yyyy-MM-dd") : null,
      output_time: outputTime ? format(outputTime, "yyyy-MM-dd") : null,
      expiry_time: expiryTime ? format(expiryTime, "yyyy-MM-dd") : null,
      status: statusId,
      stock_id: stockId,
      description: description,
    };
    updateItem(payload)
      .then((res) => {
        console.log("pl: ", payload);
        onUpdateSuccess();
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
        <DialogTitle id="form-dialog-title">
          Edit: {selectedItem && `${selectedItem.name} (${selectedItem.id})`}
        </DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <FormControl fullWidth>
              <InputLabel>Tên</InputLabel>
              <Select fullWidth value={typeId} onChange={handleTypeIdChange}>
                {itemTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Trạng thái</InputLabel>
              <Select
                fullWidth
                label="Status"
                value={statusId}
                onChange={handleStatusChange}
              >
                {statusOptions.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    disabled={item.permission === "admin" && !user.isAdmin}
                  >
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Kho</InputLabel>
              <Select fullWidth value={stockId} onChange={handleStockChange}>
                {stockOptions.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    disabled={item.permission === "admin" && !user.isAdmin}
                  >
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(DialogEditItem);
