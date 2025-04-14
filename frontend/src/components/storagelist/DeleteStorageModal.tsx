import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useThemeMode } from "../../context/ThemeContext";
import { light, dark } from "./theme";

interface DeleteStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteStorageModal: React.FC<DeleteStorageModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const { isDark } = useThemeMode();
  const theme = isDark ? dark : light;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
      PaperProps={{
        sx: {
          backgroundColor: theme.cardBackground,
          color: theme.cardText,
        },
      }}
    >
      <DialogTitle id="delete-dialog-title">Delete Storage</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description" sx={{ color: theme.cardText }}>
          Are you sure you want to delete this storage?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: theme.cardText,
            color: theme.cardText,
            "&:hover": {
              backgroundColor: theme.cardBackground,
              color: theme.primaryButtonHoverBg,
              borderColor: theme.primaryButtonHoverBg,
            },
          }}
        >
          No
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            backgroundColor: theme.dangerButtonBg,
            color: "#fff",
            "&:hover": {
              backgroundColor: theme.dangerButtonHoverBg,
            },
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteStorageModal;
