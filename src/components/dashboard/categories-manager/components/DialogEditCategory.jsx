import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { updateCategory } from "../../../../api/stock-manager";
import "./DialogEditCategory.scss";

export default function DialogEditCategory({
  open,
  handleClose,
  onUpdateSuccess,
  selectedItem,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState(null);

  // Update state when the selected item changes
  React.useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setDescription(selectedItem.description);
    }
  }, [selectedItem]);

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleCheckValidateName = () => {
    if (!name) {
      setNameError("Không được bỏ trống tên");
    } else {
      setNameError(null);
    }
  };

  const handleSubmitForm = () => {
    if (!name) {
      setNameError("Không được bỏ trống tên");
      return;
    }

    const payload = {
      id: selectedItem.id,
      name,
      description,
    };

    updateCategory(payload)
      .then((res) => {
        console.log(res);
        onUpdateSuccess();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="dialogEditCategory">
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sửa danh mục</DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <TextField
              fullWidth
              label="Mã danh mục"
              value={selectedItem.id_category} // Assuming id_category is the correct field
              disabled
            />
            <TextField
              fullWidth
              label="Tên danh mục"
              value={name}
              onChange={handleNameChange}
              onBlur={handleCheckValidateName}
              error={!!nameError}
              helperText={nameError}
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
          <Button onClick={handleSubmitForm} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
