import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { updateUser } from "../../../../api/stock-manager";
import { listPermissions } from "../../../../meta-data/permissions";
import TextError from "../../../common/text-error/TextError";

const STATUS_OPTIONS = [
  { value: "active", label: "Hoạt động" },
  { value: "deactive", label: "Bị Khoá" },
];

export default function DialogEditUser({
  open,
  handleClose,
  selectedUser,
  onEditSuccess,
}) {
  // modal value
  const [email, setEmail] = useState(selectedUser.email);
  const [firstName, setFirstName] = useState(selectedUser.first_name);
  const [lastName, setLastName] = useState(selectedUser.last_name);
  const [permission, setPermission] = useState(selectedUser.permission_id);
  const [status, setStatus] = useState(selectedUser.status);

  // options state
  const [permissions, setPermissions] = useState([]);

  // error state
  const [emailErr, setEmailErr] = useState(null);
  const [firstNameErr, setFirstNameErr] = useState(null);
  const [lastNameErr, setLastNameErr] = useState(null);

  // server error state
  const [serverError, setServerError] = useState(null);

  const getListPermissions = async () => {
    const data = await listPermissions();
    setPermissions(data);
  };

  useEffect(() => {
    getListPermissions();
  }, []);

  const handleCheckValidateEmail = () => {
    if (!email) {
      return setEmailErr("Không được bỏ trống");
    }

    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!emailPattern.test(email)) return setEmailErr("Email không hợp lệ");

    setEmailErr(null);
  };

  const handleCheckValidateFirstName = () => {
    if (!firstName) {
      return setFirstNameErr("Không được bỏ trống họ");
    }
    setFirstNameErr(null);
  };

  const handleCheckValidateLastName = () => {
    if (!lastName) {
      return setLastNameErr("Không được bỏ trống tên");
    }
    setLastNameErr(null);
  };

  const handleSubmitForm = () => {
    const payload = {
      id: selectedUser.id,
      email,
      first_name: firstName,
      last_name: lastName,
      permission,
      status,
    };

    updateUser(payload)
      .then((res) => {
        if (res.error) return setServerError(res.message);
        onEditSuccess();
        handleClose();
      })
      .catch((err) => {
        setServerError(err.message);
      });
  };

  const errorMessage = serverError ? (
    <TextError>{serverError}</TextError>
  ) : null;

  const disabledSubmitForm = () => {
    let isDisabled = false;

    const errArr = [emailErr, firstNameErr, lastNameErr];

    errArr.forEach((err) => {
      if (err !== null) {
        isDisabled = true;
        return;
      }
    });

    return isDisabled;
  };

  return (
    <div className="dialogAddNewItemType">
      <Dialog
        open={open}
        fullWidth
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Sửa thông tin</DialogTitle>
        <DialogContent>
          <form className="formEditItem">
            <TextField
              fullWidth
              label="Email"
              value={email}
              error={emailErr}
              helperText={emailErr}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleCheckValidateEmail}
            />
            <TextField
              fullWidth
              label="Họ"
              value={firstName}
              error={firstNameErr}
              helperText={firstNameErr}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={handleCheckValidateFirstName}
            />
            <TextField
              fullWidth
              label="Tên"
              value={lastName}
              error={lastNameErr}
              helperText={lastNameErr}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={handleCheckValidateLastName}
            />
            <Select
              native
              fullWidth
              label="Chức danh"
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
            >
              {permissions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
            <Select
              native
              fullWidth
              label="Trạng thái"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUS_OPTIONS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Select>
          </form>
          {errorMessage}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitForm}
            color="primary"
            disabled={disabledSubmitForm()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
