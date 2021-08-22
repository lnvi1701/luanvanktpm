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
import {
  addStaffRequest,
  getItem,
  getItemsByType,
} from "../../../../api/stock-manager";
import { getItemTypes } from "../../../../meta-data/item-types";
import { statuses } from "../../../../meta-data/statuses";
import { stocks } from "../../../../meta-data/stocks";

function DialogAddNewItem({ open, handleClose, onUpdateSuccess, user }) {
  // modal value
  const [typeId, setTypeId] = useState("");
  const [itemId, setItemId] = useState("");
  const [detail, setDetail] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedStock, setUpdatedStock] = useState("");
  const [updatedAddress, setUpdatedAddress] = useState("");

  // list options
  const [statusOptions, setStatusOptions] = useState([]);
  const [stockOptions, setStockOptions] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);
  const [listSelectItem, setListSelectItem] = useState([]);

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
  const getListItemTypes = async () => {
    const itemTypes = await getItemTypes();
    setItemTypes(itemTypes);
  };
  const getItemById = async (id) => {
    const item = await getItem(id);
    setSelectedItem({ ...item });
  };
  const getListItemByType = async (type_id) => {
    const listItems = await getItemsByType(type_id);
    const cvToOption =
      listItems &&
      listItems.map((item) => {
        return { label: `${item.id} [${item.status}]`, value: item.id };
      });
    setListSelectItem(cvToOption);
  };

  useEffect(() => {
    getStatuses();
    getStocks();
    getListItemTypes();
  }, []);

  useEffect(() => {
    getListItemByType(typeId);
  }, [typeId]);

  useEffect(() => {
    getItemById(itemId);
  }, [itemId]);

  const handleTypeIdChange = (event) => {
    const { value } = event.target;
    setTypeId(value);
  };

  const handleItemIdChange = (event) => {
    const { value } = event.target;
    setItemId(value);
  };

  const handleUpdatedStatusChange = (event) => {
    const { value } = event.target;
    setUpdatedStatus(value);
  };

  const handleUpdatedStockChange = (event) => {
    const { value } = event.target;
    setUpdatedStock(value);
  };

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
        <DialogTitle id="form-dialog-title">Tạo mới yêu cầu</DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <FormControl fullWidth>
              <InputLabel>Loại thiết bị</InputLabel>
              <Select fullWidth value={typeId} onChange={handleTypeIdChange}>
                {itemTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Mã thiết bị</InputLabel>
              <Select fullWidth value={itemId} onChange={handleItemIdChange}>
                {listSelectItem &&
                  listSelectItem.map((item) => (
                    <option key={item.label} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Trạng thái hiện tại</InputLabel>
              <Select fullWidth value={selectedItem && selectedItem.status_id}>
                {statusOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Trạng thái sau khi duyệt</InputLabel>
              <Select
                fullWidth
                value={updatedStatus}
                onChange={handleUpdatedStatusChange}
              >
                {statusOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Kho hiện tại</InputLabel>
              <Select
                fullWidth
                label="Stock"
                value={selectedItem && selectedItem.stock_id}
              >
                {stockOptions &&
                  stockOptions.map((item) => (
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
                value={updatedStock}
                onChange={handleUpdatedStockChange}
              >
                {stockOptions &&
                  stockOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <TextareaAutosize
                value={updatedAddress}
                className="textArea"
                minRows={2}
                placeholder="Địa chỉ sau khi duyệt"
                onChange={(e) => setUpdatedAddress(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextareaAutosize
                value={detail}
                className="textArea"
                minRows={3}
                placeholder="Chi tiết"
                onChange={(e) => setDetail(e.target.value)}
              />
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

export default connect(mapStateToProps, null)(DialogAddNewItem);
