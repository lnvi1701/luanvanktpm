import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { getItems } from "../../../api/stock-manager";
import DialogAddNewItem from "./components/DialogAddNewItem";
import DialogEditItem from "./components/DialogEditItem";
import DialogAlertRemove from "./components/DialogAlertRemove";
import "./ItemsManager.scss";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ItemsManager(props) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [openEditItem, setOpenEditItem] = useState(false);
  const [openAddNewItem, setOpenAddNewItem] = useState(false);
  const [openAlertRemove, setOpenAlertRemove] = useState(false);

  const handleClickOpen = (item) => {
    setOpenEditItem(true);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setOpenEditItem(false);
    setSelectedItem(null);
  };

  const getData = async () => {
    const data = await getItems();
    console.log(data);
    setList(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdateDataSuccess = () => {
    getData();
    handleClose();
  };

  const handleDeleteItem = (item) => {
    setOpenAlertRemove(true);
    setSelectedItem(item);
  };

  const rows = [
    ...list.map((item) =>
      createData(
        item.id,
        item.name,
        item.input_time,
        item.output_time,
        item.expiry_time,
        item.status,
        item.stock,
        item.stock_type,
        item.status_id,
        item.stock_id,
        item.stock_type_id,
        item.description,
        item.type_id
      )
    ),
  ];

  const actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <EditIcon onClick={() => handleClickOpen(item)} />
        <DeleteIcon onClick={() => handleDeleteItem(item)} />
      </div>
    );
  };

  const dialogEditItem = openEditItem ? (
    <DialogEditItem
      open={openEditItem}
      handleClose={handleClose}
      selectedItem={selectedItem}
      onUpdateSuccess={handleUpdateDataSuccess}
    />
  ) : null;

  const dialogAddNewItem = openAddNewItem ? (
    <DialogAddNewItem
      open={openAddNewItem}
      handleClose={() => setOpenAddNewItem(false)}
      selectedItem={selectedItem}
      onUpdateSuccess={handleUpdateDataSuccess}
    />
  ) : null;

  const dialogAlertRemove = openAlertRemove ? (
    <DialogAlertRemove
      open={openAlertRemove}
      handleClose={() => setOpenAlertRemove(false)}
      selectedItem={selectedItem}
      onSuccess={() => getData()}
    />
  ) : null;

  return (
    <div className="itemsManager">
      <Button onClick={() => setOpenAddNewItem(true)}>Thêm sản phẩm</Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Vị trí</TableCell>
              <TableCell>Ngày nhập</TableCell>
              <TableCell>Hạn dùng</TableCell>
              <TableCell>Ngày xuất</TableCell>
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
                <TableCell>{row.status}</TableCell>
                <TableCell>{`${row.stock} (${row.stock_type})`}</TableCell>
                <TableCell>{getDate(row.input_time)}</TableCell>
                <TableCell>{getDate(row.expiry_time)}</TableCell>
                <TableCell>{getDate(row.output_time)}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{actionsBlock(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {dialogEditItem}
      {dialogAddNewItem}
      {dialogAlertRemove}
    </div>
  );
}

const getDate = (stringDate) => {
  if (!stringDate) return "--";
  const cvDate = new Date(stringDate);
  return format(cvDate, "dd/MM/yyyy");
};

const createData = (
  id,
  name,
  input_time,
  output_time,
  expiry_time,
  status,
  stock,
  stock_type,
  status_id,
  stock_id,
  stock_type_id,
  description,
  type_id
) => {
  return {
    id,
    name,
    input_time,
    output_time,
    expiry_time,
    status,
    stock,
    stock_type,
    status_id,
    stock_id,
    stock_type_id,
    description,
    type_id,
  };
};

export default ItemsManager;
