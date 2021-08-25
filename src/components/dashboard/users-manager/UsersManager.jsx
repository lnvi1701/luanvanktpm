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
import React, { useEffect, useState } from "react";
import { getUsers } from "../../../api/stock-manager";
import DialogAddNewUser from "./components/DialogAddNewUser";
import DialogAlertRemoveUser from "./components/DialogAlertRemoveUser";
import DialogEditUser from "./components/DialogEditUser";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import DialogAlertResetPassword from "./components/DialogAlertResetPassword";
import ToastServive from "react-material-toast";
import "./UsersManager.scss";

const toast = ToastServive.new({
  place: "bottomRight",
  duration: 2,
  maxCount: 8,
});

function createData(
  id,
  first_name,
  last_name,
  full_name,
  email,
  permission,
  permission_id,
  status
) {
  return {
    id,
    first_name,
    last_name,
    full_name,
    email,
    permission,
    permission_id,
    status,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function UsersManager(props) {
  const [list, setList] = useState([]);
  const classes = useStyles();

  const [selectedUser, setSelectedUser] = useState();

  const [openAddNewUser, setOpenAddNewUser] = useState(false);
  const [openAlertRemove, setOpenAlertRemove] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);

  const getData = async () => {
    const data = await getUsers();
    setList(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const rows = [
    ...list.map((item) =>
      createData(
        item.id,
        item.first_name,
        item.last_name,
        item.full_name,
        item.email,
        item.permission,
        item.permission_id,
        item.status
      )
    ),
  ];

  const handleUpdateData = () => {
    getData();
  };

  const handleClose = () => {
    setOpenEditUser(false);
    setOpenResetPassword(false);
    setSelectedUser(null);
  };

  const handleDeleteItem = (item) => {
    setSelectedUser(item);
    setOpenAlertRemove(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditUser(true);
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setOpenResetPassword(true);
  };

  const handleResetPasswordSuccess = () => {
    handleClose();
    getData();
    toast.info("reset password success!");
  };

  const actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <EditIcon onClick={() => handleEditUser(item)} />
        <VpnKeyOutlinedIcon onClick={() => handleResetPassword(item)} />
        <DeleteIcon onClick={() => handleDeleteItem(item)} />
      </div>
    );
  };

  const dialogAddNewUser = openAddNewUser ? (
    <DialogAddNewUser
      open={openAddNewUser}
      handleClose={() => setOpenAddNewUser(false)}
      onAddNewSuccess={handleUpdateData}
    />
  ) : null;

  const dialogAlertRemove = openAlertRemove ? (
    <DialogAlertRemoveUser
      open={openAlertRemove}
      handleClose={() => setOpenAlertRemove(false)}
      selectedItem={selectedUser}
      onSuccess={() => getData()}
    />
  ) : null;

  const dialogEditUser = openEditUser ? (
    <DialogEditUser
      open={openEditUser}
      selectedUser={selectedUser}
      handleClose={handleClose}
      onEditSuccess={handleUpdateData}
    />
  ) : null;

  const dialogResetPassword = openResetPassword ? (
    <DialogAlertResetPassword
      open={openResetPassword}
      handleClose={handleClose}
      selectedItem={selectedUser}
      onSuccess={handleResetPasswordSuccess}
    />
  ) : null;

  return (
    <div className="usersManager">
      <Button color="primary" onClick={() => setOpenAddNewUser(true)}>
        Thêm tài khoản nhân viên
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Chức năng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.full_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.permission}</TableCell>
                <TableCell>
                  {row.status === "active" ? "Hoạt động" : "Bị Khoá"}
                </TableCell>
                <TableCell>{actionsBlock(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {dialogAddNewUser}
      {dialogAlertRemove}
      {dialogEditUser}
      {dialogResetPassword}
    </div>
  );
}

export default UsersManager;
