import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { ModalContext } from "../contextAPI";

export const AlertModal = () => {
  const { alertModal, toggleModal } = useContext(ModalContext);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alertModal.isOpen}
      onClose={() => toggleModal("alert-modal")}
      autoHideDuration={2000}
    >
      <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
        {alertModal.message}
      </Alert>
    </Snackbar>
  );
};
