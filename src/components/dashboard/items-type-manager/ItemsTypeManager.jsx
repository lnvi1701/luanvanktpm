import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React, { useEffect, useState } from "react";
import { getItemsType } from "../../../api/stock-manager";
import styles from "./ItemsTypeManager.scss";
import DialogAddNewItemType from "./components/DialogAddNewItemType";

function createData(id, name, category, unit, description) {
  return { id, name, category, unit, description };
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SORT_OPTIONS = [
  { value: "id", label: "Mã" },
  { value: "name", label: "Tên" },
  { value: "category", label: "Danh mục" },
];

const SORT_ORDER_OPTIONS = [
  { value: "ASC", label: "Tăng dần" },
  { value: "DESC", label: "Giảm dần" },
];

function ItemsTypeManager(props) {
  const [list, setList] = useState([]);
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState(null);

  const [openEditItem, setOpenEditItem] = useState(false);
  const [openAddNewItem, setOpenAddNewItem] = useState(false);
  const [openAlertRemove, setOpenAlertRemove] = useState(false);
  const [sortProperty, setSortProperty] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");

  const handleClickOpen = (item) => {
    setOpenEditItem(true);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setOpenEditItem(false);
    setSelectedItem(null);
  };

  const getData = async (sortProperty, sortOrder) => {
    const data = await getItemsType(sortProperty, sortOrder);
    setList(data);
  };

  const handleUpdateDataSuccess = () => {
    getData(sortProperty, sortOrder);
    handleClose();
  };

  const handleDeleteItem = (item) => {
    setOpenAlertRemove(true);
    setSelectedItem(item);
  };

  useEffect(() => {
    getData(sortProperty, sortOrder);
  }, [sortProperty, sortOrder]);

  const rows = [
    ...list.map((item) =>
      createData(item.id, item.name, item.category, item.unit, item.description)
    ),
  ];

  const selectSort = (
    <div className="selectSort">
      Sắp xếp theo:&nbsp;
      <Select
        native
        label="Sắp xếp"
        value={sortProperty}
        onChange={(e) => setSortProperty(e.target.value)}
      >
        {SORT_OPTIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
      Thứ tự:&nbsp;
      <Select
        native
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        {SORT_ORDER_OPTIONS.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
    </div>
  );

  const actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <EditIcon onClick={() => handleClickOpen(item)} />
        <DeleteIcon onClick={() => handleDeleteItem(item)} />
      </div>
    );
  };

  const dialogAddNewItemType = openAddNewItem ? (
    <DialogAddNewItemType
      open={openAddNewItem}
      handleClose={() => setOpenAddNewItem(false)}
      selectedItem={selectedItem}
      onUpdateSuccess={handleUpdateDataSuccess}
    />
  ) : null;

  return (
    <div className={styles.itemsTypeManager}>
      <Button color="primary" onClick={() => setOpenAddNewItem(true)}>
        Thêm loại vật tư
      </Button>
      {selectSort}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Đơn vị</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.unit}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{actionsBlock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {dialogAddNewItemType}
    </div>
  );
}

export default ItemsTypeManager;
