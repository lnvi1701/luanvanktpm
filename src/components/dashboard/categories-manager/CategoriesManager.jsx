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
import { getCategories } from "../../../api/stock-manager";
import "./CategoriesManager.scss";

function createData(id, name, description) {
  return { id, name, description };
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function CategoriesManager(props) {
  const [list, setList] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const getData = async () => {
      const data = await getCategories();
      console.log(data);
      setList(data);
    };
    getData();
  }, []);

  const rows = [
    ...list.map((item) => createData(item.id, item.name, item.description)),
  ];

  const actionsBlock = (
    <div className="actionsBlock">
      <EditIcon />
      <DeleteIcon />
    </div>
  );

  return (
    <div className="categoriesManager">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã</TableCell>
              <TableCell>Tên</TableCell>
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
                <TableCell>{row.description}</TableCell>
                <TableCell>{actionsBlock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CategoriesManager;
