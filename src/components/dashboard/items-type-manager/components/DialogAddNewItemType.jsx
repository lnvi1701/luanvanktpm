import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { getListCategories } from "../../../../meta-data/categories";
import "./DialogEditItemType.scss";
import { useForm } from "react-hook-form";

export default function DialogAddNewItemType({
  open,
  handleClose,
  onUpdateSuccess,
}) {
  // modal value
  const [name, setName] = useState("");
  const [category, setCategory] = useState("1");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");

  // list options
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getListCategories();
      console.log(categories);
      setCategories(categories);
    };

    getCategories();
  }, []);

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
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
    const payload = {
      name,
      category,
      unit,
      description,
    };
    console.log(payload);
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
        <DialogTitle id="form-dialog-title">Thêm loại vật tư</DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <TextField
              fullWidth
              label="Tên vật tư"
              value={name}
              onChange={handleNameChange}
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
                  {item.label}
                </option>
              ))}
            </Select>
            <TextField
              fullWidth
              label="Đơn vị"
              value={unit}
              onChange={handleUnitChange}
            />
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
