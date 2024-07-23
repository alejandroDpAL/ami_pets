
import { Alert } from "@mui/material";
import React from "react";
import { ImConnection } from "react-icons/im";


function AlertSuccess() {
  return (
    <Alert icon={<ImConnection fontSize="inherit" />} severity="success">
      Here is a gentle confirmation that your action was successful.
    </Alert>
  );
}

export default AlertSuccess;
