import { useState } from "react";

import {
  Alert,
  Snackbar,
} from "@mui/material";

import { ToastContext } from "../../context/ToastContext.js";

function ToastProvider({ children }) {
  const [toast, setToast] =
    useState({
      open: false,
      message: "",
      severity: "success",
    });

  const showToast = (
    message,
    severity = "success",
  ) => {
    setToast({
      open: true,
      message,
      severity,
    });
  };

  const closeToast = () => {
    setToast((previous) => ({
      ...previous,
      open: false,
    }));
  };

  return (
    <ToastContext.Provider
      value={{ showToast }}
    >
      {children}

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={closeToast}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={closeToast}
          severity={toast.severity}
          variant="filled"
          sx={{
            width: "100%",
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export default ToastProvider;