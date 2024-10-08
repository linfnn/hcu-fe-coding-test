import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ITask from "../../types/task.types";
import { forwardRef, ReactElement, Ref, useContext, useState } from "react";
import { ModalContext } from "../contextAPI";
import api from "../../services/mockAPI";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CreateModal = () => {
  const { isCreateModalOpen, toggleModal, toggleReGetting } =
    useContext(ModalContext);
  const [task, setTask] = useState<ITask>();
  const [error, setError] = useState<boolean>(false);
  const handleClose = () => {
    toggleModal("create-modal");
  };
  const handleCreateTask = async () => {
    if (task?.title) {
      if (!task?.description) {
        task.description = "";
      }
      const created = await api.post("/tasks", task);
      console.log(created);
      if (created.status === 201) {
        toggleModal("create-modal");
        toggleModal("alert-modal", "Created new task successfully");
        toggleReGetting();
      }
    } else {
      setError(true);
    }
  };
  const handleSetTitle = (title: string) => {
    if (title) {
      setError(false);
    }
    setTask((prev: any) => ({
      ...prev,
      title,
    }));
  };
  const handleSetDesc = (description: string) => {
    setTask((prev: any) => ({
      ...prev,
      description,
    }));
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isCreateModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Add new task</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <FormGroup className="mb-4">
            <Typography>Title</Typography>
            <TextField
              required
              error={error}
              label="Title"
              variant="outlined"
              onChange={(e) => handleSetTitle(e.target.value)}
              onBlur={(e) => {
                !e.target.value && setError(true);
              }}
            />
            {error && (
              <Typography color="error" variant="caption" className="pl-2">
                Please entry this field
              </Typography>
            )}
          </FormGroup>
          <FormGroup className="mb-4">
            <Typography>Description</Typography>
            <textarea
              className="border-[1px] border-[#c4c4c4] rounded-[5px] h-[100px]"
              onChange={(e) => handleSetDesc(e.target.value)}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCreateTask}
            color="info"
            variant="contained"
            disabled={error}
          >
            Add
          </Button>
          <Button onClick={handleClose} color="inherit" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
