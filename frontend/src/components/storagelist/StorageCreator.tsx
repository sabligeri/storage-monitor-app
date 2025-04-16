import {
  Collapse,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useThemeMode } from "../../context/ThemeContext";
import { light, dark } from "./theme";
import { useState } from "react";

interface Props {
  open: boolean;
  onToggle: () => void;
  newStorageName: string;
  setNewStorageName: (name: string) => void;
  handleStorageCreate: () => void;
}

const StorageCreator: React.FC<Props> = ({
  open,
  onToggle,
  newStorageName,
  setNewStorageName,
  handleStorageCreate,
}) => {
  const { isDark } = useThemeMode();
  const theme = isDark ? dark : light;

  const [error, setError] = useState("");

  const validateAndSubmit = () => {
    if (!newStorageName.trim()) {
      setError("Storage name is required.");
      return;
    }

    setError("");
    handleStorageCreate();
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Collapse in={open}>
        <Paper
          sx={{
            p: 3,
            mt: 2,
            backgroundColor: theme.cardBackground,
            color: theme.cardText,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2} color={theme.cardText}>
            Create New Storage
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
            <TextField
              label="Storage Name"
              value={newStorageName}
              onChange={(e) => {
                setNewStorageName(e.target.value);
                if (error) setError("");
              }}
              fullWidth
              error={!!error}
              helperText={error}
              InputLabelProps={{ style: { color: theme.cardText } }}
              InputProps={{
                style: { color: theme.cardText },
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
              <Button
                variant="contained"
                onClick={validateAndSubmit}
                sx={{
                  backgroundColor: theme.primaryButtonBg,
                  color: theme.primaryButtonText,
                  "&:hover": {
                    backgroundColor: theme.primaryButtonHoverBg,
                    color: theme.primaryButtonText,
                  },
                }}
              >
                <AddIcon sx={{ mr: 1 }} />
                Create
              </Button>

              <Button
                variant="outlined"
                onClick={onToggle}
                sx={{
                  borderColor: theme.cardText,
                  color: theme.cardText,
                  "&:hover": {
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.primaryButtonHoverBg,
                    color: theme.primaryButtonHoverBg,
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default StorageCreator;
