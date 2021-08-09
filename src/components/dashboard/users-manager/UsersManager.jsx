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
import "./UsersManager.scss";

function createData(
  id,
  first_name,
  last_name,
  full_name,
  email,
  permission,
  permission_id
) {
  return {
    id,
    first_name,
    last_name,
    full_name,
    email,
    permission,
    permission_id,
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

  useEffect(() => {
    const getData = async () => {
      const data = await getUsers();
      setList(data);
    };
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
        item.permission_id
      )
    ),
  ];

  const actionsBlock = (
    <div className="actionsBlock">
      <EditIcon />
      <DeleteIcon />
    </div>
  );

  return (
    <div className="usersManager">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Chức năng</TableCell>
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
                <TableCell>{actionsBlock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsersManager;
