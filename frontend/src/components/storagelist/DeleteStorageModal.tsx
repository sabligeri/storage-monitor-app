import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

interface DeleteStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteStorageModal: React.FC<DeleteStorageModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">Delete Storage</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete this storage?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          No
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteStorageModal;
