import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { addCategory } from "../../../../api/stock-manager";
import "./DialogAddNewCategory.scss";

export default function DialogAddNewCategory({
  open,
  handleClose,
  onAddNewSuccess,
}) {
  // modal value
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [id_category, setIdCategory] = useState("");
  const [idCategoryError, setIdCategoryError] = useState(null);

  // error state
  const [nameErr, setNameErr] = useState(null);

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

  const handleCheckValidateCategori = (event) => {
    if (!event || !event.target.value) {
      setIdCategoryError("Không được bỏ trống mã danh mục");
      return;
    }
    setIdCategoryError(null);
  };

  const handleSubmitForm = () => {
    const payload = {
      name,
      description,
      id_categori: id_category,
    };

    addCategory(payload)
      .then((res) => {
        if (res.success) {
          console.log(res);
          onAddNewSuccess();
        } else {
          // Handle the case where id_category already exists in the database
          setIdCategoryError("Mã danh mục đã tồn tại.");
        }
      })
      .catch((err) => {
        console.log(err);
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
        <DialogTitle id="form-dialog-title">Thêm danh mục</DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <TextField
              fullWidth
              label="Mã danh mục"
              value={id_category}
              onChange={(e) => setIdCategory(e.target.value)}
              onBlur={handleCheckValidateCategori}
              error={!!idCategoryError}
              helperText={idCategoryError}
            />
            <TextField
              fullWidth
              label="Tên danh mục"
              value={name}
              onChange={handleNameChange}
              onBlur={handleCheckValidateName}
              error={!!nameErr}
              helperText={nameErr}
            />
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
          <Button
            onClick={handleSubmitForm}
            color="primary"
            disabled={!name || idCategoryError}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
