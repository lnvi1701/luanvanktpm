import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar"; // Add this line
import React, { useEffect, useState } from "react";
import { addItemType } from "../../../../api/stock-manager";
import { getListCategories } from "../../../../meta-data/categories";
import "./DialogEditItemType.scss";

export default function DialogAddNewItemType({
  open,
  handleClose,
  onAddNewSuccess,
}) {
  // modal value
  const [id_itype, setIdItype] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("1"); // Chọn giá trị mặc định là chuỗi rỗng
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");

  // list options
  const [categories, setCategories] = useState([{ label: "", value: "" }]);
  // error state
  const [nameErr, setNameErr] = useState(null);
  const [id_itypeErr,  setIdItypeErr] = useState(null);

  // Notification state
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getListCategories();
      // Thêm tùy chọn "Tất cả" với giá trị rỗng vào danh sách danh mục
      setCategories(["", ...categories]);
    };

    getCategories();
  }, []);

  const handleIdItypeChange = (event) => {
    const { value } = event.target;
    setIdItype(value);
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleCheckValidateName = (event) => {
    if (!event || !event.target.value) {
      setNameErr("Không được bỏ trống tên");
      return;
    }
    setNameErr(null);
  };

  const handleCheckValidateIdItype= (event) => {
    if (!event || !event.target.value) {
      setIdItypeErr("Vui lòng nhập mã loại thiết bị!");
      return;
    }
    setIdItypeErr(null);
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setCategory(value);
  };

  const handleUnitChange = (event) => {
    const { value } = event.target;
    setUnit(value);
  };

  const handleSubmitForm = () => {
    // Validate that the required fields are not empty
    if (!id_itype || !name || !category || !unit) {
      // Display an error message
      setNotification({
        open: true,
        message: "Vui lòng điền đầy đủ thông tin.",
      });
      return;
    }

    const payload = {
      id_itype,
      name,
      category,
      unit,
      description,
    };

    addItemType(payload)
      .then((res) => {
        console.log(res);
        onAddNewSuccess();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNotificationClose = () => {
    setNotification({
      open: false,
      message: "",
    });
  };

  return (
    <div className="dialogAddNewItemType">
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Thêm loại thiết bị</DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <TextField
              fullWidth
              label="Mã thiết bị"
              value={id_itype}
              onChange={handleIdItypeChange}
              onBlur={handleCheckValidateIdItype}
              error={id_itypeErr}
              helperText={id_itypeErr}
            />
            <TextField
              fullWidth
              label="Tên thiết bị"
              value={name}
              onChange={handleNameChange}
              onBlur={handleCheckValidateName}
              error={nameErr}
              helperText={nameErr}
            />
           <Select
              native
              fullWidth
              label="Danh mục"
              value={category}
              onChange={handleCategoryChange}
            >
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label === "" ? "Tất cả" : item.label}
                </option>
              ))}
            </Select>
            <TextField fullWidth label="Đơn vị" value={unit} onChange={handleUnitChange} />
            <TextareaAutosize
              value={description}
              className="textArea"
              aria-label="minimum height"
              minRows={8}
              placeholder="Mô tả"
              onChange={(e) => setDescription(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitForm} color="primary" disabled={!name}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        message={notification.message}
      />
    </div>
  );
}