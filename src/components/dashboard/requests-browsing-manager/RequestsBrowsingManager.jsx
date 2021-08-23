import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from "@material-ui/icons/Description";
import React, { useEffect, useState } from "react";
import { getStaffRequests } from "../../../api/stock-manager";
import { statuses } from "../../../meta-data/statuses";
import { stocks } from "../../../meta-data/stocks";
import DialogCreateRequest from "./components/DialogCreateRequest";
import DialogEditRequest from "./components/DialogEditRequest";
import { REQUEST_STATUS_STATE } from "../../../meta-data/request-statuses";
import { connect } from "react-redux";
import Chip from "@material-ui/core/Chip";

function createData(
  current_status_id,
  date_time,
  detail,
  full_name,
  id,
  item_id,
  staff_id,
  status,
  update_address,
  updated_status_id,
  name,
  current_stock,
  updated_stock
) {
  return {
    current_status_id,
    date_time,
    detail,
    full_name,
    id,
    item_id,
    staff_id,
    status,
    update_address,
    updated_status_id,
    name,
    current_stock,
    updated_stock,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function RequestsBrowsingManager(props) {
  const [list, setList] = useState([]);
  const classes = useStyles();

  const [openCreateRequest, setOpenCreateRequest] = useState(false);
  const [openDialogEditRequest, setOpenDialogEditRequest] = useState(false);

  // options data
  const [statusOptions, setStatusOptions] = useState([]);
  const [stockOptions, setStockOptions] = useState([]);

  // state
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [sortProperty, setSortProperty] = useState("id");
  const [sortOrder, setSortOrder] = useState("ASC");

  const getData = async (sortProperty, sortOrder) => {
    const data = await getStaffRequests(sortProperty, sortOrder);
    console.log(data);
    setList(data);
  };

  const getStocks = async () => {
    const listStocks = await stocks();
    setStockOptions(listStocks);
  };

  useEffect(() => {
    const getStatuses = async () => {
      const listStt = await statuses();
      setStatusOptions(listStt);
    };
    getStatuses();
    getStocks();
    getData(sortProperty, sortOrder);
  }, [sortProperty, sortOrder]);

  const handleUpdateData = () => {
    getData(sortProperty, sortOrder);
  };

  const handleClose = () => {
    setOpenCreateRequest(false);
    setOpenDialogEditRequest(false);
    setSelectedRequest(null);
  };

  const handleDescriptionClick = (item) => {
    setSelectedRequest(item);
    setOpenDialogEditRequest(true);
  };

  const rows = [
    ...list.map((item) =>
      createData(
        item.current_status_id,
        item.date_time,
        item.detail,
        item.full_name,
        item.id,
        item.item_id,
        item.staff_id,
        item.status,
        item.update_address,
        item.updated_status_id,
        item.name,
        item.current_stock,
        item.updated_stock
      )
    ),
  ];

  const renderDeleteIcon = props.user.isAdmin ? (
    <DeleteIcon onClick={() => {}} />
  ) : null;

  const actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <DescriptionIcon onClick={() => handleDescriptionClick(item)} />
        {renderDeleteIcon}
      </div>
    );
  };

  const renderDialogCreateRequest = openCreateRequest ? (
    <DialogCreateRequest
      open={openCreateRequest}
      handleClose={handleClose}
      onUpdateSuccess={handleUpdateData}
    />
  ) : null;

  const renderDialogEditRequest = openDialogEditRequest ? (
    <DialogEditRequest
      open={openDialogEditRequest}
      handleClose={handleClose}
      onUpdateSuccess={handleUpdateData}
      selectedRequest={selectedRequest}
    />
  ) : null;

  return (
    <div>
      <Button color="primary" onClick={() => setOpenCreateRequest(true)}>
        Tạo yêu cầu duyệt
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã </TableCell>
              <TableCell>Tên thiết bị (Mã)</TableCell>
              <TableCell>Trạng thái hiện tại</TableCell>
              <TableCell>Kho hiện tại</TableCell>
              <TableCell>Nhân viên tạo báo cáo</TableCell>
              <TableCell>Trạng thái sau khi duyệt</TableCell>
              <TableCell>Kho sau khi duyệt</TableCell>
              <TableCell>Trạng thái báo cáo</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{`${row.name} [${row.item_id}]`} </TableCell>
                <TableCell>
                  <Select disabled fullWidth value={row.current_status_id}>
                    {statusOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select disabled fullWidth value={row.current_stock}>
                    {stockOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>{row.full_name}</TableCell>
                <TableCell>
                  <Select disabled fullWidth value={row.updated_status_id}>
                    {statusOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Select disabled fullWidth value={row.updated_stock}>
                    {stockOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <Chip
                    color={
                      row.status === "waiting"
                        ? ""
                        : row.status === "not_approved"
                        ? "secondary"
                        : "primary"
                    }
                    label={REQUEST_STATUS_STATE[row.status]}
                  />
                </TableCell>
                <TableCell>{actionsBlock(row)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {renderDialogCreateRequest}
      {renderDialogEditRequest}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, null)(RequestsBrowsingManager);
