import {
    Collapse,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
    return (
        <Box sx={{ mb: 3 }}>
            <Collapse in={open}>
                <Paper sx={{ p: 3, mt: 2 }}>
                    <Typography variant="h6" fontWeight="bold" mb={2}>
                        Create New Storage
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                        <TextField
                            label="Storage Name"
                            value={newStorageName}
                            onChange={(e) => setNewStorageName(e.target.value)}
                            fullWidth
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 1 }}>
                            <Button
                                variant="contained"
                                onClick={handleStorageCreate}
                                sx={{
                                    backgroundColor: "#595f39", 
                                    color: "#E4E4DE",           
                                    "&:hover": {
                                        backgroundColor: "#1B1B1B", 
                                    },
                                }}
                            >
                                <AddIcon sx={{ mr: 1 }} />
                                Create
                            </Button>

                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={onToggle}
                                sx={{
                                    borderColor: "#1B1B1B",
                                    color: "#1B1B1B",
                                    "&:hover": {
                                        backgroundColor: "#C4C5BA",
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
