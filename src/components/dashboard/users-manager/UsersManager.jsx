import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import BlockIcon from "@material-ui/icons/Block";
import React, { useEffect, useState } from "react";
import { getUsers } from "../../../api/stock-manager";
import "./UsersManager.scss";
import DialogAddNewUser from "./components/DialogAddNewUser";

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

  const [openAddNewUser, setOpenAddNewUser] = useState(false);

  const getData = async () => {
    const data = await getUsers();
    setList(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpdateData = () => {
    getData();
  };

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

  const actionsBlock = (
    <div className="actionsBlock">
      <EditIcon />
      <BlockIcon />
      <DeleteIcon />
    </div>
  );

  const dialogAddNewUser = openAddNewUser ? (
    <DialogAddNewUser
      open={openAddNewUser}
      handleClose={() => setOpenAddNewUser(false)}
      onAddNewSuccess={handleUpdateData}
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
                <TableCell>{actionsBlock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {dialogAddNewUser}
    </div>
  );
}

export default UsersManager;
