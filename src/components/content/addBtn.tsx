import { Button } from "@mui/material";
import { useContext } from "react";
import { ModalContext } from "../contextAPI";

export const AddButton = () => {
  const { toggleModal } = useContext(ModalContext);
  const toggleCreateModal = () => {
    toggleModal("create-modal");
  };
  return (
    <div className="py-5 max-[520px]:py-2">
      <Button
        color="info"
        variant="contained"
        size="large"
        onClick={toggleCreateModal}
      >
        Add Task
      </Button>
    </div>
  );
};
