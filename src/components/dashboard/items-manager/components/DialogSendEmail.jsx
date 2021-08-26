import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { format } from "date-fns";
import {
  mailExpiryDeviceToStaff,
  getItemsByExpiryTime,
} from "../../../../api/stock-manager";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "24px 0",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function DialogSendEmail({ open, handleClose }) {
  const classes = useStyles();
  const [listExpiryItems, setListExpiryItems] = useState([]);
  const [success, setSuccess] = useState([]);

  const [loading, setLoading] = React.useState(false);

  const html = useRef(null);

  const rows = [
    ...listExpiryItems.map((item) =>
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

  useEffect(() => {
    getListExpiryItems();
  }, []);

  const getListExpiryItems = () => {
    const tomorrow = getTomorrow();
    const payload = {
      expiry_time: format(tomorrow, "yyyy-MM-dd"),
    };
    getItemsByExpiryTime(payload)
      .then((res) => {
        setListExpiryItems(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      const payload = {
        html: html.current.innerHTML,
        expiry_time: format(getTomorrow(), "yyyy-MM-dd"),
        stock_email: process.env.REACT_APP_STOCK_EMAIL,
        stock_password: process.env.REACT_APP_STOCK_PASSWORD,
      };
      mailExpiryDeviceToStaff(payload)
        .then((res) => {
          setSuccess(res);
        })
        .catch((err) => {
          setSuccess(false);
        })
        .finally(() => setLoading(false));
    }
  };

  const renderSuccessMessage = success.length ? (
    <div>
      <p>Đã gửi email thành công cho:</p>
      {success.map((mess, i) => (
        <p key={i}>{mess}</p>
      ))}
    </div>
  ) : null;

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const renderListExpiryItems = listExpiryItems.length ? (
    <div style={{ marginTop: "12px" }}>
      <TableContainer ref={html} component={Paper}>
        <Table aria-label="simple table" style={{ border: "1px solid black" }}>
          <TableHead style={{ border: "1px solid black" }}>
            <TableRow style={{ border: "1px solid black" }}>
              <TableCell>Mã</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Vị trí</TableCell>
              <TableCell>Ngày nhập</TableCell>
              <TableCell>Ngày hết hạn</TableCell>
              <TableCell>Mô tả</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ border: "1px solid black" }}>
            {rows.map((row) => (
              <TableRow key={row.id} style={{ border: "1px solid black" }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {row.id}
                </TableCell>
                <TableCell
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {row.status}
                </TableCell>
                <TableCell
                  style={{ border: "1px solid black", padding: "8px" }}
                >{`${row.stock} (${row.stock_type})`}</TableCell>
                <TableCell
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {getDate(row.input_time)}
                </TableCell>
                <TableCell
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {getDate(row.expiry_time)}
                </TableCell>
                <TableCell
                  style={{ border: "1px solid black", padding: "8px" }}
                >
                  {row.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  ) : (
    <p>Không có thiết bị nào hết hạn vào ngày mai</p>
  );

  const renderSubmitButton = (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color="primary"
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          {success ? <CheckIcon /> : <SaveIcon />}
        </Fab>
        {loading && (
          <CircularProgress size={68} className={classes.fabProgress} />
        )}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
        >
          Gửi email
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );

  return (
    <div>
      <Dialog
        open={open}
        maxWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Gửi thông báo qua email:
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Những sản phẩm sẽ hết hạn vào ngày mai:
            {renderListExpiryItems}
            {renderSubmitButton}
            {renderSuccessMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Huỷ
          </Button>
        </DialogActions>
      </Dialog>
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

const getTomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
};
